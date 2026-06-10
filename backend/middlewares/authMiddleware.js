import { query } from "../config/db.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export default async function tokenValidator(req,res,next){
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({error:'Token is missing!',success:false});
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const id = decoded.userId;
        const isExist = await query('SELECT * FROM users WHERE id=$1',[id]);
        if (isExist.rows.length === 0){
            return res.status(400).json({erro:'Access denied!'});
        }
        req.id = id;
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:'invalid token',success:false})
    }
}