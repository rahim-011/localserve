import useAuthStore from "../../store/authStore"
import {  X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import API from "../../models/api";
import toast from 'react-hot-toast'

export default function Verification(){
    const {userInfos,isLoading,updateUserInfos} = useAuthStore() || {};
    const location = useLocation();
    if (isLoading) return null;
    const [otpCode,setOtpCode] = useState('');
    const {email} = userInfos;
    const navigate = useNavigate();
    const [resend,setResend] = useState('resend code?');
    const [error,setError] = useState('');
    const handleUserOtpCode = async (e)=>{
        e.preventDefault();
        try{
            const response = await API.patch('/auth/change-settings',{otpCode});
            if (response.data.success){
                if (location.state && location.state.updatedData){
                    const {updatedData} = location.state;
                    updateUserInfos({username:updatedData.newUsername,email:updatedData.newEmail});
                }else{
                    navigate('/settings');
                }
                toast.success(response.data.message,{
                    id:'setting-success',
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
                setTimeout(()=>{
                    navigate('/settings');
                },400)
            }else{
                toast.error(response?.data.error,{
                    id:'settings-error',
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
            toast.error(error?.response.data.error,{
                id:'settings-server-error',
                style: {
                background: '#111625',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                },
            })
            console.log(error)
        }
    }

    const handleResendOtp = async (e) =>{
        e.preventDefault();
        setResend('resending...');
        try{
            const response  = await API.post('/auth/resend-otp');
            if (response.data.success){
                setError('');
                setResend(response.data.message);
            }
            else {
                setError(response.data.error);
                setResend('resend code?')
            }
        }   
        catch(error){
            setError(error);
        }
        finally{
            setTimeout(()=>{
                setError('');
            },400)
        }
     }
    return(
        <div className="w-full min-h-screen flex items-center justify-center fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50">
            <div className="bg-dark-blue flex flex-col gap-5 rounded-2xl p-7 border border-white/10 max-w-3xl w-[90%]">
                <Link to='/settings' className="self-end  text-white cursor-pointer"><X /></Link>
                <h1 className="text-white font-bold text-4xl text-center">OTP Verfication</h1>
                <div className="flex flex-col gap-5 items-center">
                    <p className="text-text-darker text-center">Please enter the code that we send to <span className="text-white font-bold pl-1">{email}</span></p>
                    <div className="flex flex-col gap-4 my-6 items-center self-center md:flex-row">
                        <label htmlFor="code" className="text-text-darker text-[1.3rem]">Code:</label>
                        <input className="placeholder:text-text-darker border border-white/10 rounded-[5px] bg-nav-bg p-2 focus-within:border-shield-bg outline-none text-[1.3rem] text-white" type="text" placeholder="6 digits" name="otpCode" value={otpCode} id="code" onChange={(e)=>{const val=e.target.value ;if (val.length<=6){setOtpCode(e.target.value)};}} onPaste={(e)=>{setOtpCode(e.clipboardData.getData('text').slice(0,6))}} ></input>
                        <button className="text-green-400 bg-award-bg/20 p-3 rounded-[5px] cursor-pointer hover:brightness-110 font-bold w-full" onClick={handleUserOtpCode}>Verify</button>
                    </div>
                </div>
                <button className={`self-center cursor-pointer  font-bold mt-5 underline hover:brightness-105 ${resend === 'Code resent successfully!' ? 'text-green-400' : 'text-shield-bg' }`} onClick={handleResendOtp}>{resend}</button>
            </div>
        </div>
    )
}