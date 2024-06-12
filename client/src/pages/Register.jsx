import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";

const Register = () => {

  const axios = useAxios()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [profileImage, setProfileImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profileImage", data.profileImage[0]);


    axios.post("/users/register", formData)
    .then((response) => {
      console.log(response.data);
    })


  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.username && (
              <span className="text-red-600 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-gray-700">
              Profile Image
            </label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          {profileImage && (
            <div className="mb-4">
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
