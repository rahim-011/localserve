import { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ElectrecianImg from '../src/assets/Electrecian.webp'
import {Eye ,EyeOff,ArrowBigLeft} from 'lucide-react'
import PlumberImg from '../src/assets/Plumber.webp'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

export default function Register() {
    const [hasAccount, setHasAccount] = useState(true);
    const [view,setView] = useState(false);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [rememberMe,setRememberMe] = useState(false);
    const [isSamePass,setIsSamePass] = useState(null);
    const [confirmPass,setConfirmPass]= useState('');
    const [signUpPass,setSignUpPass] = useState('');

    const navigate = useNavigate();
    const {isLoading,login,signUp} = useAuthStore();
    const handleLogin = async (e) =>{
        e.preventDefault();
        const result = await login(username,password,rememberMe);
        if (result.success){
            navigate('/');
        }
    }
    const handleSignUp = async (e)=>{
        e.preventDefault();
        if (signUpPass == confirmPass){setIsSamePass(true)}else{setIsSamePass(false)};
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const {password,username,email} = data;
        const result = await signUp(username,email,password);
        if (result.success){
            toast.success('Accont created successfully',{
                id: 'register-success',
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
            setHasAccount(true);
        }
        else{
            toast.error('Something went wrong!',{
                id:'register-error',
                 style: {
                        background: '#111625',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                },
            })
        }
    }

    return (
        <main className='flex justify-center items-center min-h-screen bg-dark-blue px-4 py-6 md:px-0 md:py-0'>
            <Link to="/" className="flex items-center gap-1 fixed top-4 left-4 md:absolute md:top-6 md:left-6 text-xs md:text-sm text-white bg-blue-900 font-bold rounded-2xl p-2 hover:brightness-115 border border-white/10 z-50">
                <ArrowBigLeft size={16} className='md:w-5 md:h-5'/> Back
            </Link>
            <div className="w-full max-w-5xl md:h-[620px] h-auto flex flex-col md:flex-row bg-[#1a1d29] border border-[#25293c] rounded-2xl overflow-hidden relative shadow-2xl shadow-black" data-aos='fade-up' data-aos-easing='ease-out-back'>
                
                <form className={`p-6 md:p-9 flex flex-col w-full md:w-1/2 md:absolute md:top-0 md:bottom-0 transition-all ease-in-out duration-500 ${hasAccount ? 'md:left-0 md:opacity-100 md:z-10' : 'md:left-1/2 md:opacity-0 md:z-0 md:pointer-events-none'} ${!hasAccount && 'hidden md:block'}`} onSubmit={handleLogin}>
                    <h1 className='text-white font-bold text-3xl md:text-5xl mb-2'>Welcome Back</h1>
                    <p className='text-text-darker font-medium mb-6 md:mb-8 text-sm md:text-base'>Sign up with your localServe account.</p>
                    <div className='flex flex-col gap-3 mb-6 md:mb-8'>
                        <div className='flex flex-col relative group'>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                placeholder=" " 
                                required 
                                className='peer rounded-[5px] border border-[#2c3149] bg-[#131520] text-white focus:border-[#3b82f6] outline-none p-3 pt-5 transition-all 
                                autofill:bg-[#131520] autofill:text-white [-webkit-text-fill-color:white] [transition:background-color_9999s_ease-in-out_0s]'
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                            <label 
                                htmlFor="username" 
                                className='text-[#4a526d] absolute left-3 top-3.5 transition-all pointer-events-none bg-[#131520] px-1 peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-[-8px] 
                                peer-autofill:text-xs peer-autofill:top-[-8px] peer-autofill:text-[#3b82f6]'
                            >
                                Username
                            </label>
                        </div>

                        <div className='flex flex-col relative group'>
                            <input 
                                type={view ? 'text' : 'password'} 
                                name="password" 
                                id="password" 
                                placeholder=" " 
                                required 
                                className='peer rounded-[5px] border border-[#2c3149] bg-[#131520] text-white focus:border-[#3b82f6] outline-none p-3 pt-5 transition-all
                                autofill:bg-[#131520] autofill:text-white [-webkit-text-fill-color:white] [transition:background-color_9999s_ease-in-out_0s]'
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <span className='absolute top-5 right-4 text-[#4a526d] hover:cursor-pointer transition-all' onClick={()=>setView(!view)}>{view ? <Eye size={20}/> : <EyeOff size={20}/>}</span>
                            <label 
                                htmlFor="password" 
                                className='text-[#4a526d] absolute left-3 top-3.5 transition-all pointer-events-none bg-[#131520] px-1 peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-[-8px]
                                peer-autofill:text-xs peer-autofill:top-[-8px] peer-autofill:text-[#3b82f6]'
                            >
                                Password
                            </label>
                        </div>

                        <div className='flex items-center gap-2 justify-between px-2 text-xs md:text-sm'>
                            <span className='flex items-center gap-1'>
                                <input type="checkbox" name="remember" id="remember" onClick={()=>setRememberMe(true)}/>
                                <label htmlFor="remember" className='text-text-darker'>Remember for 30 days</label>
                            </span>
                            <span><a className='text-blue-500 font-medium cursor-pointer'>Forgot password?</a></span>
                        </div>
                    </div>
                    <button className='text-center bg-[#1c2642] border border-[#3b82f6] text-white hover:bg-[#233054] transition-all rounded-[5px] p-3 mb-5 text-sm md:text-base'  type='submit'>Login In</button>
                    <div className='text-center mt-6 text-xs md:text-sm'>
                        <span className='text-[#94a3b8]'>Don't have an account? </span>
                        <button type="button" className='text-[#3b82f6] font-medium hover:text-[#2563eb] underline underline-offset-4 transition-colors duration-200' onClick={() => setHasAccount(false)}>
                            Sign Up
                        </button>
                    </div>
                </form>

                <form className={`p-6 md:p-9 flex flex-col w-full md:w-1/2 md:absolute md:top-0 md:bottom-0 transition-all ease-in-out duration-500 ${!hasAccount ? 'md:left-1/2 md:opacity-100 md:z-10' : 'md:left-0 md:opacity-0 md:z-0 md:pointer-events-none'} ${hasAccount && 'hidden md:block'}`} onSubmit={handleSignUp}>
                    <h1 className='text-white font-bold text-3xl md:text-5xl mb-2 whitespace-nowrap'>Create an account</h1>
                    <p className='text-text-darker font-medium mb-6 md:mb-8 text-sm md:text-base'>Sign Up for free.</p>
                    <div className='flex flex-col gap-3 mb-6 md:mb-8'>
                        <div className='flex flex-col relative group'>
                            <input 
                                type="text" 
                                name="username" 
                                id="reg-username" 
                                placeholder=" " 
                                required 
                                className='peer rounded-[5px] border border-[#2c3149] bg-[#131520] text-white focus:border-[#3b82f6] outline-none p-3 pt-5 transition-all 
                                autofill:bg-[#131520] autofill:text-white [-webkit-text-fill-color:white] [transition:background-color_9999s_ease-in-out_0s]'
                            />
                            <label 
                                htmlFor="reg-username" 
                                className='text-[#4a526d] absolute left-3 top-3.5 transition-all pointer-events-none bg-[#131520] px-1 peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-[-8px] 
                                peer-autofill:text-xs peer-autofill:top-[-8px] peer-autofill:text-[#3b82f6]'
                            >
                                Username
                            </label>
                        </div>

                        <div className='flex flex-col relative group'>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder=" " 
                                required 
                                className='peer rounded-[5px] border border-[#2c3149] bg-[#131520] text-white focus:border-[#3b82f6] outline-none p-3 pt-5 transition-all 
                                autofill:bg-[#131520] autofill:text-white [-webkit-text-fill-color:white] [transition:background-color_9999s_ease-in-out_0s]'
                            />
                            <label 
                                htmlFor="email" 
                                className='text-[#4a526d] absolute left-3 top-3.5 transition-all pointer-events-none bg-[#131520] px-1 peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-[-8px] 
                                peer-autofill:text-xs peer-autofill:top-[-8px] peer-autofill:text-[#3b82f6]'
                            >
                                Email
                            </label>
                        </div>

                        <div className='flex flex-col relative group'>
                            <input 
                                type={view ? 'text' : 'password'}
                                name="password" 
                                id="reg-password" 
                                placeholder=" " 
                                required 
                                className='peer rounded-[5px] border border-[#2c3149] bg-[#131520] text-white focus:border-[#3b82f6] outline-none p-3 pt-5 transition-all
                                autofill:bg-[#131520] autofill:text-white [-webkit-text-fill-color:white] [transition:background-color_9999s_ease-in-out_0s]'
                                onChange={(e)=>setSignUpPass(e.target.value)}
                            />
                            <span className='absolute top-5 right-4 text-[#4a526d] hover:cursor-pointer transition-all' onClick={()=>setView(!view)}>{view ? <Eye size={20}/> : <EyeOff size={20}/>}</span>
                            <label 
                                htmlFor="reg-password" 
                                className='text-[#4a526d] absolute left-3 top-3.5 transition-all pointer-events-none bg-[#131520] px-1 peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-[-8px]
                                peer-autofill:text-xs peer-autofill:top-[-8px] peer-autofill:text-[#3b82f6]'
                            >
                                Password
                            </label>
                        </div>

                        <div className='flex flex-col relative group'>
                            <input 
                                type={view ? 'text' : 'password'} 
                                name="confirmedPassword" 
                                id="confirmedPassword" 
                                placeholder=" " 
                                required 
                                className='peer rounded-[5px] border border-[#2c3149] bg-[#131520] text-white focus:border-[#3b82f6] outline-none p-3 pt-5 transition-all
                                autofill:bg-[#131520] autofill:text-white [-webkit-text-fill-color:white] [transition:background-color_9999s_ease-in-out_0s]'
                                onChange={(e)=>setConfirmPass(e.target.value)}
                            />
                            <span className='absolute top-5 right-4 text-[#4a526d] hover:cursor-pointer transition-all' onClick={()=>setView(!view)}>{view ? <Eye size={20}/> : <EyeOff size={20}/>}</span>
                            <label 
                                htmlFor="confirmedPassword" 
                                className='text-[#4a526d] absolute left-3 top-3.5 transition-all pointer-events-none bg-[#131520] px-1 peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:top-[-8px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-[-8px]
                                peer-autofill:text-xs peer-autofill:top-[-8px] peer-autofill:text-[#3b82f6]'
                            >
                                Confirm Password
                            </label>
                           {isSamePass === false && <span className='italic text-xs md:text-sm text-red-500 mt-2'>Passwords do not match</span>}
                        </div>
                    </div>
                    <button className='text-center bg-[#1c2642] border border-[#3b82f6] text-white hover:bg-[#233054] transition-all rounded-[5px] p-3 mb-5 text-sm md:text-base' type='submit'>Sign Up</button>
                    <div className='text-center mt-6 text-xs md:text-sm'>
                        <span className='text-[#94a3b8]'>Already have an account? </span>
                        <button type="button" className='text-[#3b82f6] font-medium hover:text-[#2563eb] underline underline-offset-4 transition-colors duration-200' onClick={() => setHasAccount(true)}>
                            Sign In
                        </button>
                    </div>
                </form>

                <div className={`hidden md:block absolute overflow-hidden z-30 w-1/2 top-0 bottom-0 transition-all ease-in-out duration-500 ${hasAccount ? 'left-1/2' : 'left-0'}`}>
                    <img 
                        alt='Electrecian' 
                        src={ElectrecianImg} 
                        className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ${hasAccount ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    
                    <img 
                        alt='Plumber' 
                        src={PlumberImg} 
                        className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ${!hasAccount ? 'opacity-100' : 'opacity-0'}`} 
                    />
                </div>

            </div>
       </main>
    )
}
