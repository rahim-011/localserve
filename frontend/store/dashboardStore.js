import { create } from "zustand";
import API from "../models/api";


export const useDashboardStore = create((set,get)=>({
    userBookings:[],
    fetchUserBookings : async () =>{
        try{
            const response = await  API.get('/booking/all');
            if (response.data.success){
                set({userBookings:response.data.userBookings})
            }
        }
        catch(error){
            console.log(error);
        }
    },
    deleteBookingId : async (id)=>{
        const newBookings  = get().userBookings.filter((prevBooking)=>prevBooking.id != id);
        set({userBookings:newBookings})
    }
}))