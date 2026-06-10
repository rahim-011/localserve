import validator from 'validator'
import { query } from '../config/db.js';
const {isEmail,isMobilePhone} = validator;

export default async function saveContactInfos(req,res){
    try{
        const {firstName,lastName,phone,email,subject,message} = req.body;
        const allExists = firstName && lastName && phone && subject && message && email;
        if (!allExists){
            return res.status(400).json({error:'All fields are required!',success:false});
        }
        const isValidEmail = isEmail(email);
        const isValidPhone = isMobilePhone(phone,'any');
        if (!isValidEmail){
            return res.status(400).json({error:'Invalid email!',success:false})
        }
        if (!isValidPhone){
            return res.status(400).json({error:'Invalid phone number!',success:false});
        }
        const contactInfos = await query('INSERT INTO feedback (first_name,last_name,phone,email,subject,message) VALUES($1,$2,$3,$4,$5,$6) RETURNING * ',[firstName.trim(),lastName.trim(),phone,email,subject,message]);
        if (contactInfos.rows.length === 0){
            return res.status(404).json({error:'Try again something went wrong!',success:false})
        }
        return res.status(200).json({message:'Message sent successfully! 🎉',success:true});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:'Error internal server on the saveContactInfos function!',success:false})
    }
}