import { asyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendVerificationMail } from "../nodemailer/index.js";
import { HTMLTemplate } from "../utils/htmlTemplate.js";
import { stripe } from "../stripe/index.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "Something went wrong while generating refresh and access token"
    );
  }
};

const generateVerificationToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const verificationToken = jwt.sign(
      { _id: user._id },
      process.env.VERIFICATION_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    return verificationToken;
  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "Something went wrong while generating verification token"
    );
  }
};

const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please provide all fields");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const profileImage = req.file?.path;

  if (!profileImage) {
    throw new ApiError(400, "Please provide a profile image");
  }

  let uploadedImage = null;
  if (profileImage) {
    uploadedImage = await uploadOnCloudinary(profileImage);
  }

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    avatar: uploadedImage?.url || "",
  });

  const verificationToken = await generateVerificationToken(user._id);

  console.log(verificationToken);

  if (!verificationToken) {
    throw new ApiError(500, "Verification token not generated");
  }

  sendVerificationMail(email, verificationToken);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -paymentHistory"
  );

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    throw new ApiError(400, "Fields are required");
  }

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  // console.log(user);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.isVerified) {
    const verificationToken = await generateVerificationToken(user._id);

    sendVerificationMail(email, verificationToken);

    throw new ApiError(
      400,
      "Email not verified, Please check email and verify your email"
    );
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );


  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  console.log(token);
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.VERIFICATION_TOKEN_SECRET
    );

    console.log(decodedToken);

    if (decodedToken.exp <= Date.now() / 1000) {
      return res.status(401).send("Token expired, Please try again");
    }

    const user = await User.findById(decodedToken._id);

    if (user.isVerified) {
      return res.status(400).send(
        HTMLTemplate(
          "",
          `
      <h1>Email Already Verified</h1>
      <p>Your email has already been verified. You can now log in to your account.</p>
          <a href="${process.env.CLIENT_URL}/login">Go to Login</a>
        `
        )
      );
    }

    console.log(user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).send(
      HTMLTemplate(
        "Email Verification",
        `
       <h1>Email Verified Successfully!</h1>
          <p>Your email address has been verified. You can now log in to your account.</p>
          <a href="${process.env.CLIENT_URL}/login">Go to Login</a>
      `
      )
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid token");
  }
});


const createPaymentIntent = asyncHandler(async (req, res) => {
  const data = req.body;


  const paymentIntent = await stripe.paymentIntents.create({
    amount :  data.amount * 100,
    currency: data.currency,
    payment_method_types: ['card'],

  });



  return res.status(200).json(new ApiResponse(200, paymentIntent, "Payment intent created successfully"));


});

export { verifyUser, register, loginUser, logoutUser, createPaymentIntent };
