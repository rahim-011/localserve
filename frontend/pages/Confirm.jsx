import { Link, useNavigate } from "react-router-dom";
import {X} from 'lucide-react'
import useAuthStore from "../store/authStore";



export default function Confirm(){
    const {logout} = useAuthStore();
    const navigate = useNavigate();
    const handleLogout  = () =>{
        logout();
        navigate('/register');
    }
    return(
        <div className="w-full min-h-screen flex items-center justify-center fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50">
            <article className='flex flex-col gap-4 items-center p-7 bg-slate-800/90 border border-slate-700/50 rounded-2xl'>
                <Link className="self-end"  to='/'><X className="bg-slate-700 hover:bg-slate-600 text-slate-200 cursor-pointer mb-8"/></Link>
                <div className="flex flex-col gap-0.5 items-center mb-6">
                    <h1 className="text-4xl font-bold text-slate-100 tracking-wide">Are you sure?</h1>
                    <p className="text-sm text-slate-400 mt-1.5 max-w-2xs text-center font-medium">You will need to login again to access your account.</p>
                </div>
                <div className="flex justify-around gap-2 text-white font-bold w-full">
                    <Link to='/' className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-3 rounded-2xl w-[40%] text-center">No</Link>
                    <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-2xl cursor-pointer w-[40%] text-center" onClick={handleLogout}>Yes</button>
                </div>
            </article>
        </div>
    )
}