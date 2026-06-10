import { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ElectrecianImg from '../src/assets/Electrecian.webp'
import {Eye ,EyeOff,ArrowBigLeft} from 'lucide-react'
import PlumberImg from '../src/assets/Plumber.webp'
import useAuthStore from '../store/authStore'

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
        console.log(result);
        if (result.success){
            navigate('/');
        }
    }

    return (
        <main className='flex justify-center items-center min-h-screen bg-dark-blue'>
            <Link to="/" className="flex items-center gap-1 absolute top-6 left-6 text-sm text-white bg-blue-900 font-bold rounded-2xl p-2  hover:brightness-115  border  border-white/10">
                <ArrowBigLeft size={20}/> Back to Home
            </Link>
            <div className="w-full max-w-5xl h-[620px] flex bg-[#1a1d29] border border-[#25293c] rounded-2xl overflow-hidden relative  shadow-2xl shadow-black" data-aos='fade-up' data-aos-easing='ease-out-back'>
                
                <form className={`p-9 flex flex-col w-full md:w-1/2 absolute top-0 bottom-0 transition-all ease-in-out duration-500 ${hasAccount ? 'left-0 opacity-100 z-10' : 'left-1/2 opacity-0 z-0 pointer-events-none'}`} onSubmit={handleLogin}>
                    <h1 className='text-white font-bold text-5xl mb-2'>Welcome Back</h1>
                    <p className='text-text-darker font-medium mb-8'>Sign up with your localServe account.</p>
                    <div className='flex flex-col gap-3 mb-8'>
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

                        <div className='flex items-center gap-2 justify-between px-2'>
                            <span className='flex items-center gap-1'>
                                <input type="checkbox" name="remember" id="remember" onClick={()=>setRememberMe(true)}/>
                                <label htmlFor="remember" className='text-text-darker text-[0.9rem]'>Remember for 30 days</label>
                            </span>
                            <span><a className='text-blue-500 font-medium text-[0.9rem] cursor-pointer'>Forgot password?</a></span>
                        </div>
                    </div>
                    <button className='text-center bg-[#1c2642] border border-[#3b82f6] text-white hover:bg-[#233054] transition-all rounded-[5px] p-3 mb-5'  type='submit'>Login In</button>
                    <div className='text-center mt-6 text-[0.9rem]'>
                        <span className='text-[#94a3b8]'>Don't have an account? </span>
                        <button type="button" className='text-[#3b82f6] font-medium hover:text-[#2563eb] underline underline-offset-4 transition-colors duration-200' onClick={() => setHasAccount(false)}>
                            Sign Up
                        </button>
                    </div>
                </form>

                <form className={`p-9 flex flex-col w-full md:w-1/2 absolute top-0 bottom-0 transition-all ease-in-out duration-500 ${!hasAccount ? 'left-1/2 opacity-100 z-10' : 'left-0 opacity-0 z-0 pointer-events-none'}`} onSubmit={handleSignUp}>
                    <h1 className='text-white font-bold text-5xl mb-2'>Create an account</h1>
                    <p className='text-text-darker font-medium mb-8'>Sign Up for free.</p>
                    <div className='flex flex-col gap-3 mb-8'>
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
                           {isSamePass === false && <span className='italic text-[0.9rem] text-red-500 mt-2'>Passwords do not match</span>}
                        </div>
                    </div>
                    <button className='text-center bg-[#1c2642] border border-[#3b82f6] text-white hover:bg-[#233054] transition-all rounded-[5px] p-3 mb-5' type='submit'>Sign Up</button>
                    <div className='text-center mt-6 text-[0.9rem]'>
                        <span className='text-[#94a3b8]'>Already have an account? </span>
                        <button type="button" className='text-[#3b82f6] font-medium hover:text-[#2563eb] underline underline-offset-4 transition-colors duration-200' onClick={() => setHasAccount(true)}>
                            Sign In
                        </button>
                    </div>
                </form>

                <div className={`absolute overflow-hidden hidden z-30 w-1/2 top-0 bottom-0 md:block transition-all ease-in-out duration-500 ${hasAccount ? 'left-1/2' : 'left-0'}`}>
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