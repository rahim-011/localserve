import { ArrowBigLeft,Phone,Save, User } from "lucide-react";
import useAuthStore from "../store/authStore";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDashboardStore } from "../store/dashboardStore";
import { useState,useEffect } from "react";
import API from "../models/api";
import toast from "react-hot-toast";

export default function EditProfile(){
    const {userInfos,isLoading,updateUserInfos} = useAuthStore();
    const {username,email} = userInfos || {};

    const [newEmail,setNewEmail] = useState(email);
    const [newUsername,setNewUsername] = useState(username);
    const [currentPass,setCurrentPass] = useState('');
    const [newPass,setNewPass] = useState('');
    const [confirmNewPass,setConfirmNewPass] = useState('');
    const [samePass,setSamePass] = useState(true);


    const [error,setError] = useState('');
    const navigate = useNavigate();
    const handleChangedData = async(e) =>{
        e.preventDefault();
        if (confirmNewPass !== newPass) {  return setSamePass(false)} else {setSamePass(true)}
        const updatedData = {};
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (username != newUsername){ updatedData.username = newUsername};
        if (newEmail != email){updatedData.newEmail= newEmail};
        if (currentPass ){updatedData.currentPassword= currentPass}
        if (newPass) {updatedData.newPassword=newPass}
        if (Object.keys(updatedData).length === 0){
            return;
        }
        try{
            const response = await API.post('/auth/request-change-settings',{updatedData});
            if (response.data.success){
                setError('');
                if (response.data.requiredOtp){
                    return navigate('verification',{state:{updatedData}});
                }
                updateUserInfos({          //
                    username: updatedData.username,
                    email: updatedData.newEmail,
                });
                toast.success(response?.data.message,{
                    id: 'settings-success',
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
                })
                setTimeout(()=>
                    {navigate('/dashboard')}
                ,400)
                
            }else{
                toast.error(response.data.error,{
                    id: 'settings-error',
                    style: {
                        background: '#111625',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                    },
                })
            }
        }
        catch(error){
            toast.error(error.response?.data.error,{
                id:'settings-server-error',
                style: {
                    background: '#111625',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                },
            });
        }
    }



    if (isLoading) return null;
    return(
        <main className="min-h-fit bg-dark-blue w-full flex justify-center p-2 md:p-6">
            <div className="w-full max-w-[1250px] bg-nav-bg rounded-2xl flex flex-col gap-6  p-4 border border-white/10 shadow-2xl my-8 md:p-8" data-aos="fade-up">
                <Link className="text-green-400 flex items-center gap-2 bg-award-bg/20 self-start p-2 rounded-2xl hover:bg-award-bg/40" to='/dashboard'><ArrowBigLeft></ArrowBigLeft>Back</Link>
                <h1 className="text-white font-bold text-4xl mt-4">Edit Profile</h1>
                <div className="text-white flex items-center gap-2 bg-dark-blue/40 border border-white/5 p-4 rounded-xl w-fit min-w-[200px]">
                    <User className="text-shield-bg" size={20}/>
                    <span className="font-semibold text-lg">{username || 'Guest'}</span>
                </div>
                <div className="flex flex-col gap-5 mt-4">
                    <h2 className="text-white font-bold text-2xl border-b border-white/5 pb-3">Account Settings</h2>
                    <form className="flex flex-col gap-6" onSubmit={handleChangedData}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="username" className="text-slate-300 font-medium text-sm">Username:</label>
                                <input name="username" id="username" value={newUsername} required type="text" className="bg-[#0d111c] border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-shield-bg transition-all duration-300" onChange={(e)=>setNewUsername(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="newEmail" className="text-slate-300 font-medium text-sm">Email:</label>
                                <input name="newEmail" id="newEmail" value={newEmail} required type="email" className="bg-[#0d111c] border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-shield-bg transition-all duration-300" onChange={(e)=>setNewEmail(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="currentPassword" className="text-slate-300 font-medium text-sm">Current Password:</label>
                                <input name="currentPassword" id="currentPassword" type="password" value={currentPass} className="bg-[#0d111c] border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-shield-bg transition-all duration-300" onChange={(e)=>{setCurrentPass(e.target.value);if(error){setError('')}}}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="newPassword" className="text-slate-300 font-medium text-sm">New Password:</label>
                                <input name="newPassword" id="newPassword" type="password" value={newPass} className="bg-[#0d111c] border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-shield-bg transition-all duration-300" onChange={(e)=>setNewPass(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmNewPassword"  className="text-slate-300 font-medium text-sm">Confirm New Password:</label>
                                <input name="confirmNewPassword" id="confirmNewPassword" type="password" value={confirmNewPass} className="bg-[#0d111c] border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-shield-bg transition-all duration-300" onChange={(e)=>setConfirmNewPass(e.target.value)}></input>
                                {!samePass&& <span className="italic text-red-500">Password does not match</span>}
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="flex items-center justify-center gap-2 text-white bg-shield-bg px-6 py-3 rounded-xl font-bold shadow-lg shadow-shield-bg/10 transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer">
                                <Save size={18}/> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Outlet/>
        </main>
    )
}