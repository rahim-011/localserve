import fbIcon from '../assets/facebook.svg'
import igIcon from '../assets/instagram.png'
import inIcon from '../assets/linkedin-big-logo.png'
import xIcon from '../assets/twitter.png'
import { MapPin, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer(){
    return(
        <section className='w-full bg-nav-bg flex flex-col items-center justify-center p-4'>
               <div className='grid grid-cols-1 w-full max-w-[1200px] p-2 gap-6  md:grid-cols-2 lg:grid-cols-4 md:p-7'>
                    <div className='flex flex-col gap-3'>
                        <h4 className='text-white font-bold text-[1.3rem]'>LocalServe</h4>
                        <p className='text-text-darker font-medium'>Your trusted platform for finding and booking local services near you.</p>
                        <div className='flex gap-3'>
                            <a className='bg-shield-bg/20 p-2 rounded-full shrink-0 hover:bg-shield-bg/60 transition-colors' href='#'><img src={fbIcon} alt='fb Icon' className='w-[18px] h-[18px] invert-75'></img></a>
                            <a className='bg-shield-bg/20 p-2 rounded-full shrink-0 hover:bg-shield-bg/60 transition-colors' href='#'><img src={igIcon} alt='ig Icon ' className='w-[18px] h-[18px] invert-75'></img></a>
                            <a className='bg-shield-bg/20 p-2 rounded-full shrink-0 hover:bg-shield-bg/60 transition-colors' href='#'><img src={xIcon} alt='x Icon' className='w-[18px] h-[18px] invert-75'></img></a>
                            <a className='bg-shield-bg/20 p-2 rounded-full shrink-0 hover:bg-shield-bg/60 transition-colors' href='#'><img src={inIcon} alt='linkedIn icon' className='w-[18px] h-[18px] invert-75'></img></a>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h4 className='text-white font-bold text-[1.3rem]'>Quick Links</h4>
                        <ul className='text-text-darker font-medium'>
                            <li><Link className='hover:text-shield-bg' to='/'>Home</Link></li>
                            <li><Link className='hover:text-shield-bg/40' to='/services'>All Services</Link></li>
                            <li><Link className='hover:text-shield-bg/40' to='/emergency'>Emergency Services</Link></li>
                            <li><Link className='hover:text-shield-bg/40' to='dashboard'>My Dashboard</Link></li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h4 className='text-white font-bold text-[1.3rem]'>Services</h4>
                        <ul className='text-text-darker font-medium'>
                            <li><Link className='hover:text-shield-bg' to='/service/1'>Electrician</Link></li>
                            <li><Link className='hover:text-shield-bg' to='/service/2'>Plumber</Link></li>
                            <li><Link className='hover:text-shield-bg' to='/service/3'>Cleaning</Link></li>
                            <li><Link className='hover:text-shield-bg' to='/service/5'>Car Mechanic</Link></li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h4 className='text-white font-bold text-[1.3rem]'>Contact Us</h4>
                        <ul className='flex flex-col gap-3 p-2'>
                            <li className='flex gap-3 items-start'>
                                <MapPin className='text-shield-bg shrink-0'/>
                                <p className='text-text-darker font-medium'>123 Service Street, City, ST 12345</p>
                            </li>
                            <li className='flex gap-3 items-center'>
                                <Phone className='text-shield-bg shrink-0'/>
                                <p className='text-text-darker font-medium'>1-800-LOCAL-SRV</p>
                            </li>
                            <li className='flex gap-3 items-center'>
                                <Mail className='text-shield-bg shrink-0'/>
                                <p className='text-text-darker font-medium'>support@localserve.com</p>
                            </li>
                        </ul>
                    </div>
               </div>
               <hr className='w-full max-w-[1200px] text-text-darker/20'></hr>
               <div className='p-5'>
                    <p className='text-[1rem] text-text-darker  md:text-[1.2rem] md:mb-8'>&copy; 2026 LocalServe.All rights reserved.</p>
                </div> 
        </section>
    )
}