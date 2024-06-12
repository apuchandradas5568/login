import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPaymentIntent, loginUser, logoutUser, register, verifyUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router()



router.get('/verify/:token', verifyUser)
router.post('/register', upload.single('profileImage'), register)
router.post('/login', loginUser)
router.post('/logout', verifyJWT, logoutUser)

router.post('/create-payment-intent', createPaymentIntent)


// others 
// router.post('/refresh-token')
// router.post('/change-password')
// router.post('/verify-email')


export default router;