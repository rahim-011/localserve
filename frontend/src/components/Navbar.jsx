import {Briefcase,House,Phone,Calendar,User,Sun,Moon,LogIn,LogOut,Menu} from 'lucide-react'
import { useEffect, useRef, useState } from 'react';
import {NavLink,useNavigate,Link} from 'react-router-dom'
import useAuthStore from '../../store/authStore';
export default function Navbar(){
    const [isOpen,setIsOpen] = useState(false);
    const {isAuthenticated,user}  = useAuthStore();
    const drawer = useRef(null);
    useEffect(()=>{
        const handleClose = (e) =>{
            if (drawer.current && !drawer.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown',handleClose);
        return ()=>document.removeEventListener('mousedown',handleClose);
    },[])
    return(
        <>
            <div className='w-full h-[64px] bg-dark-blue/90 flex justify-between px-3 items-center text-text sticky top-0  backdrop-blur-md border-b border-white/5 z-49 relative md:justify-around'>
                <Link className='flex items-center gap-2' to='/'>
                    <span className='mt-1 p-1.5 bg-logo-circle rounded-full'><Briefcase size={20}/></span>
                    <span className='text-2xl font-bold bg-logo-gradient bg-clip-text text-transparent'>LocalServe</span>
                </Link>
                <div className='hidden md:flex items-center'>
                    <nav>
                        <ul className='flex gap-2 justify-between text-base'>
                            <li className='flex items-center rounded-2xl'>
                                <NavLink className='flex items-center gap-2 w-full h-full py-2 px-3 rounded-2xl hover:bg-hover-bg transition-colors' to='/' end>
                                    <House size={18}/>Home
                                </NavLink>
                            </li>
                            <li className='flex items-center rounded-2xl'>
                                <NavLink className='flex items-center gap-2 w-full h-full py-2 px-3 rounded-2xl hover:bg-hover-bg transition-colors' to='/services'>
                                    <Briefcase size={18}/>Services
                                </NavLink>
                            </li>
                            <li className='flex items-center rounded-2xl'>
                                <NavLink className='flex items-center gap-2 w-full h-full py-2 px-3 rounded-2xl hover:bg-hover-bg transition-colors' to='/booking/1'>
                                    <Calendar size={18}/>Booking
                                </NavLink>
                            </li>
                            <li className='flex items-center rounded-2xl'>
                                <NavLink className='flex items-center gap-2 w-full h-full py-2 px-3 rounded-2xl hover:bg-hover-bg transition-colors' to='/contact'>
                                    <Phone size={18}/>Contact
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='flex gap-6 items-center'>
                    {isAuthenticated ? (
                        <>
                        <Link className='p-1.5 hover:bg-hover-Sbg rounded-full' to='/dashboard'><User size={18}/></Link>
                        <Link className="p-1.5 hover:bg-hover-Sbg rounded-full transition-all duration-200" to="/confirm">
                            <LogOut size={18}/>
                        </Link>
                        </>
                    ):<Link className="p-1.5 hover:bg-hover-Sbg rounded-full transition-all duration-200" to="/register">
                            <LogIn size={18}/>
                        </Link>}
                    <button className='cursor-pointer md:hidden' onClick={()=>setIsOpen(!isOpen)}><Menu /></button>
                </div>
            </div>
            {isOpen &&
                <div className='fixed top-0 right-0 w-[75%] sm:w-[50%] md:w-[40%] h-full z-50 bg-dark-blue/90 backdrop-blur-2xl border-l border-white/5 flex flex-col p-6 shadow-2xl transition-all duration-300' ref={drawer} data-aos='fade-left' data-aos-duration='400'>
                    <nav className="w-full mb-7">
                        <ul className="flex flex-col gap-3 w-full">
                            <li className="flex items-center w-full">
                                <NavLink onClick={()=>setIsOpen(false)} className="flex items-center gap-3 w-full py-3 px-4 text-text/80 hover:text-text text-lg font-medium rounded-xl hover:bg-white/5 transition-all duration-200" to="/" end>
                                    <House size={18}/>Home
                                </NavLink>
                            </li>
                            <li className="flex items-center w-full">
                                <NavLink onClick={()=>setIsOpen(false)} className="flex items-center gap-3 w-full py-3 px-4 text-text/80 hover:text-text text-lg font-medium rounded-xl hover:bg-white/5 transition-all duration-200" to="/services">
                                    <Briefcase size={18}/>Services
                                </NavLink>
                            </li>
                            <li className="flex items-center w-full">
                                <NavLink onClick={()=>setIsOpen(false)} className="flex items-center gap-3 w-full py-3 px-4 text-text/80 hover:text-text text-lg font-medium rounded-xl hover:bg-white/5 transition-all duration-200" to="/booking/1">
                                    <Calendar size={18}/>Booking
                                </NavLink>
                            </li>
                            <li className="flex items-center w-full">
                                <NavLink onClick={()=>setIsOpen(false)} className="flex items-center gap-3 w-full py-3 px-4 text-text/80 hover:text-text text-lg font-medium rounded-xl hover:bg-white/5 transition-all duration-200" to="/contact">
                                    <Phone size={18}/>Contact
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    {isAuthenticated ? (
                        <Link className="flex items-center gap-3 w-full py-3 px-4 text-red-400 hover:text-red-300 text-lg font-medium rounded-xl hover:bg-white/5 transition-all duration-200" to="/confirm">
                            <LogOut size={18}/>
                            <span>Logout</span>
                        </Link>
                    ) : (
                        <Link className="flex items-center gap-3 w-full py-3 px-4 text-text/80 hover:text-text text-lg font-medium rounded-xl hover:bg-white/5 transition-all duration-200" to="/register">
                            <LogIn size={18}/>
                            <span>Register</span>
                        </Link>
                    )}
                </div>
            }
        </>
    )
}