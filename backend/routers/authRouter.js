import express from 'express'
import { signUpUser,loginUser, getUserData,verifyNewData,changeSettings,resendOtp } from '../controllers/authController.js';
import tokenValidator from '../middlewares/authMiddleware';

export const authRouter  = express.Router();

authRouter.post('/login',loginUser);
authRouter.post('/signUp',signUpUser);
authRouter.get('/me',tokenValidator,getUserData);
authRouter.post('/request-change-settings',tokenValidator,verifyNewData);
authRouter.patch('/change-settings',tokenValidator,changeSettings);
authRouter.post('/resend-otp',tokenValidator,resendOtp);