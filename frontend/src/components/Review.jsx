import { Star,User } from "lucide-react"
export default function Review({animation,duration,review}){
    return(
        <article className='bg-main-bg/40 rounded-2xl p-4 flex flex-col items-center gap-4 max-w-[400px] border border-white/10' data-aos={animation} data-aos-duration={duration}>
            <div className='flex justify-between gap-6 items-center p-2.5'>
                <div className='flex gap-4 items-center'>
                    <div className="bg-gradient-to-br from-[#60a5fa] via-[#a78bfa]/70 to-[#f97316] p-2 rounded-2xl"><User className="text-white"/></div>
                    <div className='text-white flex flex-col gap-1.5'>
                        <span className='font-bold text-[1.1rem]'>{review.name}</span>
                        <span className='flex gap-1 text-amber-400'>
                            <Star size={18} className="fill-current"/>
                            <Star size={18} className="fill-current"/>
                            <Star size={18} className="fill-current"/>
                            <Star size={18} className="fill-current"/>
                            <Star size={18} className="fill-current"/>
                        </span>
                    </div>
                </div>
                <div className="text-text-darker text-[0.8rem] flex-nowrap">2026-03-20</div>
            </div>
            <p className="text-text-darker text-center">{review.comment}</p>
            <div className="text-blue-500 text-[0.8rem]">
                {review.service}
            </div>
        </article>
    )
}