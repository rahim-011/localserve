import { Link, useParams } from "react-router-dom"
import {ArrowLeft, Star,DollarSign,Droplet, Clock,MapPin,Check} from 'lucide-react'
import { useServicesStore } from "../store/servicesStore";
import { useEffect } from "react";

export default function ServiceView(){
    const {id} = useParams();
    const {fetchService,viewedService} = useServicesStore();
    useEffect(()=>{
       fetchService(id);
    },[id])
    return(
        <main className="flex flex-col min-h-screen bg-dark-blue">
            <section className='w-full flex items-center justify-center mt-4  md:p-7'>
                <div className="flex flex-col gap-3 max-w-[1250px] w-full p-3 md:p-6">
                    <div className="text-white font-bold self-start"><Link to='/services' className="p-2 hover:bg-green-800 rounded-2xl flex items-center gap-1 mb-3"><ArrowLeft size={18}/>Back to Services</Link></div>
                    <div className="grid grid-cols-1 gap-5 items-center md:grid-cols-2 relative overflow-hidden">
                        <div className="flex flex-col bg-nav-bg rounded-2xl border border-white/10 p-5 gap-5" data-aos='fade-right' data-aos-duration='300'>
                            <div className="flex items-center justify-start gap-4 md:p-4 md:gap-6">
                                <div className="flex items-center p-3 rounded-3xl bg-logo-circle text-white"><Droplet size={40}/></div>
                                <div className="flex flex-col gap-2">
                                    <span className="bg-clock-bg py-1 px-2 rounded-2xl text-[0.7rem] text-center text-white font-bold self-start">{viewedService?.category}</span>
                                    <h1 className="text-white font-bold text-2xl">{viewedService?.title}</h1>
                                    <span className="flex gap-2 items-center text-[0.9rem]">
                                        <span className="flex gap-1 text-amber-400">
                                            <Star size={22} className="fill-current"/>
                                            <Star size={22} className="fill-current"/>
                                            <Star size={22} className="fill-current"/>
                                            <Star size={22} className="fill-current"/>
                                            <Star size={22} className="fill-current"/>
                                            
                                        </span>
                                        <span className="font-bold
                                         text-white">{viewedService?.rating}</span>
                                        <span className="text-text-darker font-medium py-1 text-[0.8rem] whitespace-nowrap md:text-[1rem]">({viewedService?.reviews_count} reviews)</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="bg-blue-300/6 rounded-2xl flex items-center gap-1.5 p-3">
                                    <span className="text-award-bg"><DollarSign/></span>
                                    <div className="flex flex-col">
                                        <span className="text-text-darker font-medium text-[0.8rem]">Price Range</span>
                                        <span className="text-award-bg font-bold text-[1.1rem]">${viewedService?.price_min}-${viewedService?.price_max}</span>
                                    </div>
                                </div>
                                <div className="bg-blue-300/6 rounded-2xl flex items-center gap-3 p-3">
                                    <span className="text-shield-bg"><Clock/></span>
                                    <div className="flex flex-col">
                                        <span className="text-text-darker font-medium text-[0.8rem]">Estimated Time</span>
                                        <span className="text-white font-bold">{viewedService?.duration}</span>
                                    </div>
                                </div>
                                <div className="bg-blue-300/6 rounded-2xl flex items-center gap-3 p-3">
                                    <span className="text-clock-bg"><MapPin/></span>
                                    <div className="flex flex-col ">
                                        <span className="text-text-darker font-medium text-[0.8rem]">Service Area</span>
                                        <span className="text-white font-bold">{viewedService?.service_area}</span>
                                    </div>
                                </div>
                            </div>
                            <Link className="text-center font-bold text-white rounded-2xl bg-shield-bg p-2 mt-3" to={`/booking/${viewedService?.id}`}>Book This Service</Link>
                        </div>
                        <div className="flex flex-col gap-8 p-5 bg-nav-bg border border-white/10 rounded-2xl self-start sticky top-18" data-aos='fade-left' data-aos-duration='300'>
                            <h2 className="text-white font-bold text-[1.3rem]">Service Description</h2>
                            <p className="text-text-darker font-medium">{viewedService?.description}</p>
                            <h3 className="text-white font-bold text-[1.1rem]">What's Included</h3>
                            <ul>
                                <li className="flex items-center gap-3 rounded-full text-white font-medium mb-2 text-[0.9rem]"><Check size={18} className=" text-white bg-green-400 rounded-full"/>Professional certified technician</li>
                                <li className="flex items-center gap-3 rounded-full text-white font-medium mb-2 text-[0.9rem]"><Check size={18} className=" text-white bg-green-400 rounded-full"/>All necessary tools and equipment</li>
                                <li className="flex items-center gap-3 rounded-full text-white font-medium mb-2 text-[0.9rem]"><Check size={18} className=" text-white bg-green-400 rounded-full"/>Quality workmanship guarantee</li>
                                <li className="flex items-center gap-3 rounded-full text-white font-medium mb-2 text-[0.9rem]"><Check size={18} className=" text-white bg-green-400 rounded-full"/>Follow-up support</li>
                                <li className="flex items-center gap-3 rounded-full text-white font-medium mb-2 text-[0.9rem]"><Check size={18} className=" text-white bg-green-400 rounded-full"/>Transparent pricing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex justify-center items-center p-4 mb-6">
                <div className="flex flex-col items-center justify-center gap-4 bg-hero-combined-bg w-full max-w-[1250px] p-8 rounded-2xl">
                    <h3 className="font-bold text-white text-[1.7rem] mt-4 whitespace-nowrap md:text-3xl">Ready to Get Started?</h3>
                    <p className="text-text-darker font-medium">Book your {viewedService?.title} {viewedService?.title.includes('Service') ? '' : 'Service'} today and experience professional quality</p>
                    <Link className="font-bold rounded-2xl bg-shield-bg py-3 px-5 text-white hover:brightness-115 mb-4" to={`/booking/${viewedService?.id}`}>Book Now</Link>
                </div>
            </section>
        </main>
    )
}