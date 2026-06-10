import { Calendar,Clock,MapPin,Settings,User,Wallet, X} from "lucide-react"
import { Link, Outlet } from "react-router-dom"
import useAuthStore from "../store/authStore"
import { useDashboardStore } from "../store/dashboardStore"
import { useEffect, useState } from "react";
import EmptyBookings from "../src/components/EmptyBookings";
import toast from "react-hot-toast";
import API from "../models/api";

export default function Dashboadrd(){
    const {userInfos,isLoading} = useAuthStore();
    if (isLoading) return null;
    const {fetchUserBookings,userBookings,deleteBookingId} = useDashboardStore();
    console.log(userInfos)
    const [showConfirm,setShowConfirm] = useState(false);
    const [deletedId,setDeletedId] = useState(null);
    const {email,username} = userInfos || {};
    useEffect(()=>{
        fetchUserBookings();
    },[])
    let totalSpent = userBookings?.reduce((accumulator,currentBooking)=>{
        const price = Number(currentBooking.price)||0;
        return accumulator + price
    },0)

    const deleteBooking = async (e) =>{
        e.preventDefault();
        try{
            const response =  await API.delete(`booking/${deletedId}`);
            if (response.data.success){
                await deleteBookingId(deletedId)
                toast.success(response.data.message,{
                    id:'delete-success',
                    style: {
                        background: '#111625',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                    },
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                    }
                });
            }else{
                toast.error(response.data.error,{
                    id:'delete-error',
                    style: {
                        background: '#111625',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                    },
                });
            }
        }
        catch(error){
            toast.error(error?.response?.data.error,{
                id:'delete-server-error',
                style: {
                    background: '#111625',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                },
            })
        }
        finally{
            setTimeout(()=>{
                setShowConfirm(false)
            },400)
        }
    }
    
    return(
        <main className='min-h-fit w-full bg-dark-blue flex justify-center pt-5  md:p-6'>
            {showConfirm && 
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="flex flex-col gap-4 bg-dark-blue p-5 rounded-2xl items-center">
                    <button className="text-white self-end cursor-pointer hover:scale-105" onClick={()=>setShowConfirm(false)}><X/></button>
                    <h1 className="text-white font-bold text-4xl">Are you absolutely sure?</h1>
                    <p className="text-text-darker font-medium mb-7">This action cannot be undone. Your booking will be permanently cancelled.</p>
                    <div className="flex w-full justify-around gap-6 font-bold text-white my-6">
                        <button className="w-[40%] bg-white/20 p-3 rounded-2xl hover:cursor-pointer hover:bg-white/30 transition-all ease-in-out" onClick={()=>setShowConfirm(false)}>No</button>
                        <button className="w-[40%] bg-red-500 rounded-2xl hover:cursor-pointer hover:brightness-130"  onClick={deleteBooking}>Yes</button>
                    </div>
                </div>
            </div>}
            <div className="flex flex-col gap-8 p-3 max-w-[1250px] w-full mb-7 md:p-6">
                <div className="self-start flex flex-col gap-2">
                    <h1 className="text-white font-bold text-4xl">My Dashboard</h1>
                    <p className="text-text-darker">Manage your bookings and account settings</p>
                </div>
                <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-5 " data-aos='fade-right' data-aos-duration='400'>
                        <div className="flex gap-3 justify-between">
                            <div className="bg-white/5 rounded-2xl p-4 flex flex-col gap-6 border border-white/10 flex-1">
                                <span className="text-shield-bg bg-shield-bg/15 self-start p-3 rounded-full"><Calendar/></span>
                                <span className="font-bold text-white text-3xl">{userBookings?.length}</span>
                                <span className="text-text-darker text-[0.9rem]">Active Bookings</span>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 flex flex-col gap-6 border border-white/10 flex-1">
                                <span className="text-award-bg bg-award-bg/15 self-start p-3 rounded-full"><Wallet/></span>
                                <span className="font-bold text-white text-3xl">${totalSpent}</span>
                                <span className="text-text-darker text-[0.9rem]">Total Spent</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 p-4 bg-white/5 rounded-2xl border border-white/10">
                            {userBookings?.length != 0 ? ( <>
                            <h2 className="text-white font-bold text-2xl">Upcoming Bookings</h2>
                            {userBookings?.map((userBooking,index)=>(
                                <div className="flex flex-col gap-7 p-5 border border-white/7 rounded-2xl" key={index}>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-white font-bold text-[1.1rem]">{userBooking?.service}</h3>
                                            <span className="text-[0.8rem] bg-shield-bg rounded-2xl text-white font-medium text-center self-center px-2 py-0.5">Confirmed</span>
                                        </div>
                                        <div className="text-shield-bg font-bold text-[1.3rem]">${userBooking.price}</div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="flex items-center gap-2 text-text-darker font-medium text-[0.9rem]"><Calendar size={18}/>{userBooking?.date.split('T')[0]}</span>
                                        <span className="flex items-center gap-2 text-text-darker font-medium text-[0.9rem]"><Clock size={18}/>{userBooking?.time_slot}</span>
                                        <span className="flex items-center gap-2 text-text-darker font-medium text-[0.9rem]"><MapPin size={18}/>{userBooking?.streetaddress},  {userBooking?.apartment},   {userBooking?.city}</span>
                                    </div>
                                    <div className="flex justify-between gap-3 text-white font-bold text-center items-center mt-2 text-[0.9rem]">
                                        <button className="bg-white/7 p-2 rounded-[5px] flex-1 border border-white/10 cursor-pointer hover:bg-white/12" onClick={()=>{setShowConfirm(true);setDeletedId(userBooking?.id)}}>Cancel</button>
                                    </div>
                                </div>
                            ))} </>):(
                                <EmptyBookings/>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4" data-aos='fade-left' data-aos-duration='400'>
                        <div className="flex flex-col bg-white/5 rounded-2xl border border-white/10 p-4 gap-6">
                            <div className="flex gap-4 items-center self-start p-3">
                                <div className="p-4 bg-gradient-to-br from-[#60a5fa] via-[#a78bfa]/70 to-[#f97316] rounded-full text-white"><User size={35}/></div>
                                <div className="flex flex-col">
                                    <h4 className="text-white font-bold text-[1.1rem]">{username}</h4>
                                    <span className="text-text-darker font-medium">{email}</span>
                                </div>
                            </div>
                            <div className="flex text-white font-bold mt-4">
                                <Link className="flex items-center gap-2 bg-white/7 p-2 rounded-[5px] w-full justify-center hover:bg-white/12 border border-white/10" to='/settings'><Settings size={20}/>Edit Profile</Link>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-6 p-4 flex-1 max-h-[300px]">
                            <h4 className="text-white font-bold text-[1.3rem]">Quick Actions</h4>
                            <div className="flex flex-col gap-3 text-white font-bold transition-all ease-in-out duration-300">
                                <Link className="rounded-2xl border border-white/9 bg-white/7 py-2 px-3 hover:scale-101 hover:bg-white/10" to='/booking/1'>Book New Service</Link>
                                <Link className="rounded-2xl border border-white/9 bg-white/7 py-2 px-3 hover:scale-101 hover:bg-white/10" to='/services'>View Services</Link>
                                <Link className="rounded-2xl border border-white/9 bg-white/7 py-2 px-3 hover:scale-101 hover:bg-white/10" to='/emergency'>Emergency Help</Link>
                                <Link className="rounded-2xl border border-white/9 bg-white/7 py-2 px-3 hover:scale-101 hover:bg-white/10" to='/contact'>Contact Support</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </main>
    )
}