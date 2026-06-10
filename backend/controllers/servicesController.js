import { query } from "../config/db.js";



export async function getAllServices(req,res){
    try{
        const services = await query('SELECT * FROM services');
        if (services.rows.length ===  0){
            return res.status(200).json({message:'No services are found the db',success:true,services:[]});
        }
        return res.status(200).json({message:'All services fetched successfully!',services:services.rows,success:true})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:'Error on the getAllServices function!',success:false})
    }
}
