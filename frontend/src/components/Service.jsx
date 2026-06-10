import { Shield, Star, DollarSign, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import * as Icons from 'lucide-react';
import useAuthStore from "../../store/authStore";

export default function Service({animation,duration,service}){
    const Icon = Icons[service.icon_name] || Icons.Wrench;
    const {isAuthenticated}  = useAuthStore();
    return(
        <article className='bg-nav-bg w-full rounded-2xl p-5 flex flex-col justify-between gap-6 border border-white/5 h-full min-h-[420px]' data-aos={animation} data-aos-duration={duration}>
            <div>
                <div className="w-[45px] h-[45px] flex items-center justify-center bg-logo-circle rounded-[10px] shrink-0">
                    <Icon size={26} className='text-shield-bg shrink-0'/>
                </div>
                <h4 className='mt-4 mb-1.5 text-2xl font-bold text-white'>{service.title}</h4>
                <span className='bg-clock-bg px-2.5 py-1 text-[0.8rem] rounded-2xl font-bold inline-block text-center whitespace-nowrap'>{service.category}</span>
                <div className='mt-4 flex items-center gap-2'>
                    <span className='flex gap-0.5 items-center text-amber-400 shrink-0'>
                        <Star size={16} fill="currentColor" className="shrink-0"/>
                        <Star size={16} fill="currentColor" className="shrink-0"/>
                        <Star size={16} fill="currentColor" className="shrink-0"/>
                        <Star size={16} fill="currentColor" className="shrink-0"/>
                        <Star size={16} fill="currentColor" className="shrink-0"/>
                    </span>
                    <span className='font-bold text-white text-sm'>{service.rating}</span>
                    <span className='text-[0.8rem] text-text-darker font-medium whitespace-nowrap'>({service.reviews_count} reviews)</span>
                </div>
                <div className='flex gap-1.5 items-center text-award-bg font-bold my-3 shrink-0'>
                    <DollarSign size={18} className="shrink-0"/> <span>${service.price_min}-${service.price_max}</span>
                </div>
                <div className='flex items-center gap-1.5 text-text-darker font-medium text-sm shrink-0'>
                    <Clock size={18} className="shrink-0"/> {service.duration}
                </div>
            </div>
            <div className='flex flex-col gap-2.5 mt-auto w-full shrink-0'>
                <Link className='bg-shield-bg text-white rounded-xl flex items-center justify-center p-2.5 font-bold hover:bg-shield-bg/90 transition-colors text-center text-sm shrink-0' to={isAuthenticated ? `/service/${service.id}` : '/register'}>View Details</Link>
                <Link className='bg-transparent text-white rounded-xl flex items-center justify-center p-2.5 font-bold border border-white/20 hover:bg-white/5 transition-colors text-center text-sm shrink-0' to={isAuthenticated ? `/service/${service.id}` : '/register'}>Book Now</Link>
            </div>
        </article>
    )
}