import crypto from 'crypto'
import validator from 'validator'
import { query } from '../config/db.js';
import { error } from 'console';

const {isMobilePhone}  = validator;

export  async function addBooking(req,res){
    try{
        const id = req.id ;
        const {date,timeSlot,streetAddress,city,phone,notes,apartment,service,serviceId} = req.body;
        const allExists = date && timeSlot && streetAddress && city && phone && service && apartment && serviceId;
        if (!allExists){
            return res.status(400).json({error:'All fields are required!',success:false})
        }
        const isValidPhone = isMobilePhone(phone,'any');
        if (!isValidPhone){
            return res.status(400).json({error:'Invalid phone number!',success:false})
        }
        const isService = await query('SELECT * FROM services WHERE id=$1',[serviceId]);
        if (isService.rows.length === 0){
            return res.status(400).json({error:'Service does not exist!',success:false})
        }
        const {price_min,price_max} = isService.rows[0];
        const price = (Number(price_max) + Number(price_min))/2;
        const bookingCode = crypto.randomUUID(); 
        const newBooking = await query('INSERT INTO bookings (date,time_slot,streetaddress,service,phone,apartment,notes,city,user_id,service_id,booking_code,price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *',[date,timeSlot,streetAddress,service,phone,apartment,notes,city,id,serviceId,bookingCode,price]);
        if (newBooking.rows.length === 0){
            return res.status(404).json({error:'Something went wrong please try again',success:false})
        }
        return res.status(200).json({message:'Success! Your booking has been saved',success:true})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error on the addBooking function!',success:false})
    }
}

export async function getUserBookings(req,res){
    try{
        const userId = req.id ;
        const userBookings = await query('SELECT * FROM bookings WHERE user_id =$1',[userId]);
        return res.status(200).json({message:'All user bookings are fetched successfully',success:true,userBookings:userBookings.rows});
    }
    catch(error){
        return res.status(500).json({error:'Error internal server on the getBookings function!',success:false})
    }
}


export async function deleteBooking(req,res){
    try{
        const {deletedId} = req.params;
        const userId = req.id;
        const deletedBooking = await query('DELETE FROM bookings WHERE id=$1 AND user_id=$2 RETURNING *',[deletedId,userId]);
        if (deletedBooking.rows.length === 0){
            return res.status(404).json({error:'Cant delete this booking!',success:false});
        }
        return res.status(200).json({message:'Booking is deleted successfully!',success:true});
    }
    catch(error){
        return res.status(500).json({error:'Internal server error on the deleteBooking function!',success:false})
    }
}

