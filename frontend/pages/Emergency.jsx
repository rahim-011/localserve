import { Clock, Shield,Phone,Zap,Droplet,Key } from "lucide-react";




export default function Emergency(){
    const emergencyInfos = [{type:'Emergency Electrician',phone:'Call 1-800-ELECTRIC',icon:Zap,bg:'yellow-400'},
                            {type:'Emergency Plumber',phone:'Call 1-800-PLUMBER',icon:Droplet,bg:'shield-bg'},
                            {type:'Emergency Locksmith',phone:'Call 1-800-LOCKOUT',icon:Key,bg:'orange-400'},
                            {type:'24/7 Support',phone:'Call 1-800-SUPPORT',icon:Phone,bg:'green-400'}
                            ];
    const expects = [{title:'Call Us',info:'Contact our emergency hotline immediately'},
                 {title:'Assessment',info:'Our team evaluates the situation'},
                {title:'Dispatch',info:'Nearest technician is sent to your location'},
                {title:'Resolution',info:'Problem solved quickly and professionally'}];
    return(
        <main className="bg-dark-blue min-h-screen flex flex-col flex-grow w-full">
            <section className="flex flex-col justify-center items-center p-6 bg-hero-combined-bg overflow-hidden">
                <div className="flex flex-col gap-5 items-center p-6" data-aos='fade-up'>
                    <div className="flex gap-1 p-3 text-white items-center text-[1.1rem] bg-red-400 rounded-3xl animate-pulse">
                        <span><Shield size={20}/></span>
                        <span className="font-bold">24/7 Emergency Services</span>
                    </div>
                    <div className="flex  flex-col gap-3.5 items-center">
                        <h1 className="text-white font-bold text-3xl whitespace-nowrap md:text-4xl">Need Immediate Help?</h1>
                        <p className="text-text-darker font-medium text-[1.1rem] text-center max-w-2xl">Our emergency response team is available 24/7 to handle urgent service requests. Get help when you need it most.</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center w-full md:p-8">
                <div className="flex flex-col gap-9  p-8 max-w-[1250px] w-full">
                    <div className="grid grid-cols-1 gap-6 items-center w-full md:grid-cols-2">
                        {emergencyInfos.map((emergency,index)=>(
                            <div className="flex flex-col gap-2  p-1 rounded-2xl bg-nav-bg border border-white/10 w-full md:p-4" >
                                <div className="flex  gap-5 p-4">
                                    <div className={`self-center text-white  bg-${emergency.bg} p-2 rounded-full md:p-3`}>
                                        <emergency.icon/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-white text-[1.3rem] font-bold whitespace-nowrap">{emergency.type}</h2>
                                        <p className="text-text-darker font-medium">Available 24 hours a day, 7 days a week</p>
                                    </div>
                                </div>
                                <div className="text-white flex flex-col gap-4 items-center justify-center  md:flex-row">
                                    <a href="tel:" className="flex gap-1.5 rounded-2xl bg-shield-bg items-center font-bold p-3 hover:brightness-115 cursor-pointer whitespace-nowrap md:text-[0.9rem]"><Phone size={20}/>{emergency.phone}</a>
                                    <button className="rounded-2xl border border-white/10  p-3 hover:bg-white/4 font-medium cursor-pointer whitespace-nowrap md:text-[0.9rem]">Request Callback</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 gap-3.5 items-center md:grid-cols-3">
                        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 p-4 items-center bg-nav-bg">
                            <span className="text-shield-bg bg-shield-bg/10 rounded-full p-4"><Clock/></span>
                            <h5 className="text-white font-bold text-[1.2rem]">Rapid Response</h5>
                            <p className="text-center text-text-darker font-medium ">Average response time under 30 minutes</p>
                        </div>
                        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 p-4 items-center bg-nav-bg">
                            <span className="text-shield-bg bg-shield-bg/10 rounded-full p-4"><Shield/></span>
                            <h5 className="text-white font-bold text-[1.2rem]">Licensed Professionals</h5>
                            <p className="text-center text-text-darker font-medium ">All technicians are certified and insured</p>
                        </div>
                        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 p-4 items-center bg-nav-bg">
                            <span className="text-shield-bg bg-shield-bg/10 rounded-full p-4"><Phone/></span>
                            <h5 className="text-white font-bold text-[1.2rem]">24/7 Availability</h5>
                            <p className="text-center text-text-darker font-medium ">Always here when you need us most</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex justify-center items-center w-full p-6 bg-nav-bg mb-8">
                <div className="flex flex-col items-center gap-6 max-w-5xl">
                    <h3 className="text-white font-bold text-3xl mb-3">What to Expect</h3>
                    <div className="grid grid-cols-2 gap-3.5 items-center  md:grid-cols-4">
                        {expects.map((expect,index)=>(
                            <div key={index} className="flex flex-col items-center gap-4 p-4">
                                <span className="bg-gradient-to-br from-[#60a5fa] via-[#a78bfa]/70 to-[#f97316] px-5 py-3 rounded-full text-white font-bold text-[1.1rem]">{index+1}</span>
                                <h4 className="text-white font-bold text-[1.2rem]">{expect.title}</h4>
                                <p className="text-text-darker font-medium text-[0.9rem] text-center">{expect.info}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="flex justify-center items-center p-6 mb-8">
                <div className="flex flex-col items-center gap-9 bg-gradient-to-br from-[#292233] via-[#1c2135] to-[#151724] p-8 rounded-2xl max-w-5xl w-full border border-white/10 mb-8">
                    <h2 className="text-white font-bold text-3xl">Dont't Wait in an Emergency</h2>
                    <p className="text-center text-text-darker font-medium max-w-[600px]">Every second counts. Our emergency response team is standing by to help your right now.</p>
                    <div className="flex flex-col gap-5 p-5 md:flex-row">
                        <a href='tel:' className='font-bold text-white flex gap-1 items-center p-3 rounded-2xl bg-red-400 hover:brightness-110'><Phone size={20}/> Call Emergency Line</a>
                        <button className="rounded-2xl border border-white/10  p-3 hover:bg-white/4 font-medium cursor-pointer whitespace-nowrap  text-white font-medium bg-dark-blue">Chat with Support</button>
                    </div>
                </div>
            </section>
        </main>
    )
}