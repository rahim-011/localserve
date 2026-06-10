import {query} from '../config/db.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import nodemailer from 'nodemailer'

dotenv.config();

export  async function loginUser(req,res){
    try{
        const {password,username,rememberMe} = req.body;
        if (!password || !username){
            return res.status(400).json({error:'All fileds are required!',success:false})
        }
        const isExist = await query('SELECT * FROM users WHERE username =$1',[username.trim()]);
        if (isExist.rows.length === 0){
            return res.status(400).json({error:'User does not exist!',success:false});
        }
        const id = isExist.rows[0].id;
        const hashedPassword = isExist.rows[0].password;
        const isValid = await bcrypt.compare(password,hashedPassword);
        if (!isValid){
            return res.status(400).json({error:'password is invalid',success:false});
        }
        const tokenDuration = rememberMe ? '30d' : '7d';
        const  token = jwt.sign(
            {userId: id},
            process.env.JWT_SECRET,
            {expiresIn:tokenDuration}
        );


        return res.status(200).json({message:'Login went successfuly!',success:true,token:token,user:isExist.rows});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Error on the authController',success:false})
    }
}


export  async function signUpUser(req,res){
    try{
        const {username,password,email} = req.body;
        if (!username || !password || !email ){
            return res.status(400).json({error:'All fileds are required!',success:false});
        }
        const isExist = await query('SELECT * FROM users WHERE email=$1',[email])
        if (isExist.rows.length >0){
            return res.status(400).json({error:'This email already exists!',success:false})
        }
        const isValid = validator.isEmail(email);
        if (!isValid){
            return res.status(400).json({error:'Please enter a valid email!',success:false});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await query('INSERT INTO users (username,password,email) VALUES($1,$2,$3) RETURNING *',[username,hashedPassword,email]);

        if (newUser.rows.length === 0){
            return res.status(404).json({error:'Cant add this user!',success:false});
        }
        return res.status(201).json({message:'User has been created successfuly!',success:true,user:newUser.rows[0]});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:'Error on the signUpUser function!',success:false})
    }
}

export async function getUserData(req,res){
    try{
        const userId = req.id ;
        const userData = await query('SELECT * FROM users WHERE id =$1',[userId]);
        if (userData.rows.length === 0){
            return res.status(404).json({error:'User does not exist!',success:false})
        }
        return res.status(200).json({message:'User data fetched successfuly!',success:true,user:userData.rows[0]})
    }
    catch(error){
        return res.status(500).json({error:'Error internal server on the getUserData function!',success:false})
    }
}


export async function verifyNewData(req,res){
    try{
        const id = req.id ;
        const {username,newEmail,currentPassword,newPassword} = req.body.updatedData || {};
        if (!username && !newEmail && !currentPassword){
            return res.status(400).json({error:'No changes detected!',success:false});
        }
        if (!currentPassword && (newEmail || newPassword)){
            return res.status(400).json({error:'Current password is required!',success:false});
        }
        if (newEmail){
            const isValidEmail = validator.isEmail(newEmail);
            if (!isValidEmail){
                return res.status(400).json({error:'Invalid email address!',success:false});
            }
            const isExist = await query('SELECT * FROM users WHERE email=$1',[newEmail]);
            if (isExist.rows.length > 0){
                return res.status(400).json({error:'This email already exists!',success:false});
            }
        }
        const oldData = await query('SELECT * FROM users WHERE id=$1',[id]);
        if (oldData.rows.length === 0){
            return res.status(404).json({error:'User does not exist!',success:false})
        }
        const {password,email} = oldData.rows[0];
        if (currentPassword){
            const isSamePass = await bcrypt.compare(currentPassword,password);
            if (!isSamePass){
                return res.status(400).json({error:'Incorrect password!',success:false});
            }
        }
        if (username){
            await query('UPDATE users SET username=$1 WHERE id=$2',[username,id]);
        }
        if (newEmail || newPassword){
            let hashedNewPassword = null;
            await query('DELETE FROM OTP WHERE user_id=$1', [id]);
            const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
            const expired_time = new Date(Date.now() + 5 * 60 * 1000);
            if (newPassword){
                hashedNewPassword = await bcrypt.hash(newPassword,10);
            }
            await query('INSERT INTO OTP (otp_code,expired_time,user_id,new_email,new_password) VALUES($1,$2,$3,$4,$5)',[otp_code,expired_time,id,newEmail,hashedNewPassword]);
            const transport = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.APP_EMAIL,
                    pass:process.env.APP_PASS
                }
            })
            await transport.sendMail({
                from: '"localserve" <rahimboubekeur00@gmail.com>',
                to:email,
                subject:'Secure infos Change Verification Code',
                text: `Your verification code is: ${otp_code}. Expires in 5 minutes.`
            });
            return res.status(200).json({ success: true, message: 'OTP sent successfully!' ,requiredOtp:true});
        }
        return res.status(200).json({message:'Username updated successfully',success:true,requiredOtp:false})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:'Error internal server on the verifyNewData function!',success:false})
    }
}


export async function changeSettings(req,res){
    try{
        const id = req.id;
        const userOtpCode = req.body.otpCode;
        const current_time = new Date(Date.now());
        const OtpData = await query('SELECT * FROM OTP WHERE user_id=$1',[id]);
        if (OtpData.rows.length === 0){
            return res.status(404).json({error:'Resend a new code!',success:false});
        }
        const {expired_time,new_email,new_password,otp_code} = OtpData.rows[0];
        if (current_time.getTime() > expired_time.getTime()){
            return res.status(404).json({error:'Your otp_code is expired ask for new one!',success:false})
        }
        if (otp_code !==userOtpCode){
            return res.status(400).json({error:'Incorrect otp_code',success:false});
        }
        const changedData = await query('UPDATE users SET email= COALESCE($1,email),password= COALESCE($2,password)  WHERE id=$3 RETURNING *',[new_email,new_password,id]);
        if (changedData.rows.length === 0){
            return res.status(404).json({error:'Something went wrong on changing the data!',success:false});
        }
        return res.status(200).json({message:'Data has changed successfully!',success:true})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error on the changeSettings function!',success:false})
    }
}



export async function resendOtp(req,res){
    try{
        const id = req.id;
        const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
        const expired_time = new Date(Date.now() + 5 * 60 * 1000);
        await query('INSERT INTO OTP (expired_time,user_id,otp_code) VALUES($1,$2,$3)',[expired_time,id,otp_code]);
        return res.status(200).json({message:'Code resent successfully!',success:true});
    }
    catch(error){
        return res.status(500).josn({error:'Internal server error on the resendOtp function!',success:false})
    }
}