import {ChevronDown,Calendar,LoaderCircle} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useServicesStore } from '../store/servicesStore';
import { data, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import API from '../models/api';
import toast from 'react-hot-toast';

export default function Booking(){
    const {userInfos,isLoading} = useAuthStore();
    if (isLoading) return null;
    const {username} = userInfos || {};
    const {viewedService,fetchService} = useServicesStore();
    const {id} = useParams();
    const navigate = useNavigate();

    const [isOpen,setisOpen] = useState(false);
    const containerRef = useRef(null);
    useEffect(()=>{
        const handleClose = (e)=>{
            if (containerRef.current && !containerRef.current.contains(e.target)){
                setisOpen(false);
            }
        }
        document.addEventListener('mousedown',handleClose);
        return ()=> document.removeEventListener('mousedown',handleClose);
    },[])


    const [selectedItem,setSelectedItem] = useState(viewedService?.title);
    const [activeBtn,setActiveBtn] = useState(null);
    const [step,setStep] = useState(1);
    const [Loading,setLoading] = useState('notLoaded');
    const [error,setError] = useState(null);
    const [bookingData,setBookingData] = useState({
        service:'',
        date: '',
        timeSlot:'',
        streetAddress:'',
        apartment:'',
        city:'',
        phone:'',
        notes:'',
    })

    const Services = ['Electrecian','Plumber','Cleaning Service','AC Repair','Car Mechanic','Appilance Repair','Carpenter','Painting Service'];
    const times = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'];

    useEffect(()=>{
        if (id){
            fetchService(id);
        }
    },[id]);
    useEffect(()=>{
        setSelectedItem(viewedService?.title)
        setBookingData({...bookingData,service:selectedItem});
    },[viewedService])
    const handleServiceChange  = (index,serviceName) =>{
        setSelectedItem(serviceName);
        setBookingData({...bookingData,service:serviceName});
        setisOpen(false)
        navigate(`/booking/${index + 1}`)
    }

    const handleOpen = ()=>{
        setisOpen(!isOpen);
    }



    const handleBooking = async (e) =>{
        e.preventDefault();
        setLoading('loading');
        try{
            const response = await API.post('/booking',{...bookingData,serviceId:id});
            if (response.data.success){
                setError(null);
                toast.success(response?.data?.message,{
                    id: 'booking-success',
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
                });
                setBookingData({
                    service: "", date: "", timeSlot: "",
                    name: "", streetAddress: "", city: "", phone: "", notes: ""
                });
                setStep(1);
                setTimeout(()=>{navigate('/services')},700)
            }else {
                setError(response?.data?.error);
                toast.error(response?.data?.error,{
                    id: 'booking-error',
                    style: {
                        background: '#111625',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                    }
                });
            }
            
        }
        catch(error){
            setError(error);
            toast.error(error?.response?.data.error|| 'Something went wrong!',{
                id: 'booking-server-error',
                style: {
                    background: '#111625',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                },
            });
        }
        finally{
            setTimeout(()=>{
                setLoading('loaded')
            },500)
        }
    }



    return(
        <section className='w-full bg-dark-blue flex flex-col items-center p-2'>
            <div className='flex flex-col gap-5 w-full max-w-7xl items-center pt-6'>
                <div className='flex flex-col gap-5 items-center mb-8'>
                    <h1 className='text-white font-bold text-4xl'>Book Your Service</h1>
                    <p className='text-text-darker font-medium text-[1.1rem]'>Complete the form below to schedule your appointment</p>
                </div>
                <div className='flex justify-between border border-white/10 p-5 items-center bg-[#111625] rounded-xl w-full max-w-xl mb-6'>
                    <span className={`w-10 h-10 rounded-full ${step ==1 ? ' animate-pulse bg-shield-bg' : 'animate-none bg-shield-bg'} text-white flex items-center justify-center font-bold shrink-0`}>1</span>
                    <span className={`flex-1 h-[4px] ${step <2  ? 'bg-text-darker/25' : 'bg-shield-bg'} mx-4 rounded-full`}></span>
                    <span className={`w-10 h-10 rounded-full ${step === 2 ? 'bg-shield-bg animate-pulse' : step > 2 ? 'bg-shield-bg animate-none' : 'bg-slate-700'} text-white flex items-center justify-center font-bold shrink-0`}>2</span>
                    <span className={`flex-1 h-[4px] ${step != 3 ? 'bg-text-darker/25' : 'bg-shield-bg'} mx-4 rounded-full`}></span>
                    <span className={`w-10 h-10 rounded-full  text-slate-400 flex items-center justify-center font-bold shrink-0 ${step === 3 ? 'bg-shield-bg animate-pulse' : 'bg-slate-700 animate-none'}`}>3</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-6 mb-15 items-start'>
                    <div className='flex flex-col gap-3 bg-nav-bg rounded-2xl p-4 text-white border border-white/10 w-full overflow-hidden'>
                        {step === 1 && <>
                        <h2 className="font-bold text-[1.6rem]">Select Service & Time</h2>
                        <div className="flex flex-col gap-4 mb-4 " data-aos='fade-right' data-aos-duration='400' >
                            <div className="flex flex-col gap-1 w-full relative"  ref={containerRef}>
                                <label className="font-bold">Service</label>
                                <button className="border border-white/10 py-2 px-3 rounded-2xl text-start flex justify-between items-center hover:bg-white/2 font-bold bg-dark-blue/35" onClick={handleOpen}>{selectedItem}<ChevronDown className='opacity-30' size={20}/></button>
                                {isOpen && <div className='bg-dark-blue rounded-2xl border border-white/15 absolute z-40 left-0 top-full mt-1 w-full'>
                                    <ul className='flex flex-col p-1 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/5 hover:scrollbar-thumb-white/40'>
                                        {Services.map((service,index) =>(
                                            <li key={index} className='rounded-2xl hover:bg-award-bg p-2 cursor-pointer' onClick={()=>handleServiceChange(index,service)}>{service}</li>
                                        ))}
                                    </ul>
                                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-dark-blue to-transparent pointer-events-none rounded-2xl" />
                                </div>}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="font-bold">Select Date</label>
                                <div className='border border-white/10 py-2 px-3 flex items-center gap-2 rounded-2xl hover:bg-white/2 bg-dark-blue/35 justify-between h-full'>
                                    <span className='flex items-center gap-2'><Calendar size={20}/>Pick a date</span>
                                    <span className=''><input type='date' className='bg-white/30 p-1.5 rounded-2xl text-[0.9rem]' id='date' name='date' onChange={(e)=>setBookingData({...bookingData,date:e.target.value})} value={bookingData.date}></input></span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label>Time Slot</label>
                                <div className='grid grid-cols-3 gap-2'>
                                    {times.map((time,index)=>(
                                        <button key={index} className={`rounded-2xl border border-white/10 p-2 ${index === activeBtn ? 'bg-shield-bg' : 'bg-dark-blue/35 hover:bg-white/2'}`} onClick={()=>{setActiveBtn(index);setBookingData({...bookingData,timeSlot:time})}}>{time}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        </>}
                        {step === 2 && <>
                            <h2 className='font-bold text-[1.6rem]'>Service Location & Contact</h2>
                            <p className='text-text-darker font-medium mb-5'>Where and who should our professional look for?</p>
                            <form className='flex flex-col gap-4' data-aos='fade-right' data-aos-duration='400'>
                                <div className='flex flex-col gap-1.5'>
                                    <label htmlFor='streetAddress' className='font-bold'>Street Address:</label>
                                    <input type='text' id='streetAddress' autoComplete='street-address' name='streetAddress' required placeholder='e.g., Didouche Mourad Street, No. 45' className='placeholder:text-[0.9rem] border border-white/15 rounded-[5px] p-2
                                     text-[1.2rem] focus-within:border-shield-bg outline-0' onChange={(e)=>setBookingData({...bookingData,streetAddress:e.target.value})} value={bookingData.streetAddress}></input>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label htmlFor='phone' className='font-bold'>Phone:</label>
                                    <input type='tel' name='phone' id='phone' autoComplete='tel' placeholder='e.g., 0550 12 34 56' required className='placeholder:text-[0.9rem] border border-white/15 rounded-[5px] p-2
                                     text-[1.2rem] focus-within:border-shield-bg outline-0' onChange={(e)=>setBookingData({...bookingData,phone:e.target.value})} value={bookingData.phone}></input>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label htmlFor='city' className='font-bold'>City:</label>
                                    <input type='text' id='city' name='city' autoComplete='address-level2' required placeholder='e.g., Algiers' className='placeholder:text-[0.9rem] border border-white/15 rounded-[5px] p-2
                                     text-[1.2rem] focus-within:border-shield-bg outline-0' onChange={(e)=>setBookingData({...bookingData,city:e.target.value})} value={bookingData.city}></input>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label htmlFor='apartment'>Apartment:</label>
                                    <input type='text' name='apartment' autoComplete='address-line2' id='apartment' required placeholder='e.g., Apt 4B, 3rd Floor' className='placeholder:text-[0.9rem] border border-white/15 rounded-[5px] p-2
                                     text-[1.2rem] focus-within:border-shield-bg outline-0' onChange={(e)=>setBookingData({...bookingData,apartment:e.target.value})} value={bookingData.apartment}></input>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label htmlFor='notes' className='font-bold'>Notes:</label>
                                    <textarea placeholder='Any notes?' autoComplete='off' className='placeholder:text-[0.9rem] border border-white/15 rounded-[5px] p-2
                                     text-[1.2rem] focus-within:border-shield-bg outline-0' id='notes' onChange={(e)=>setBookingData({...bookingData,notes:e.target.value})} value={bookingData.notes}></textarea>
                                </div>
                            </form>
                        </>}
                        {step === 3 &&<>
                            <h2 className='font-bold text-[1.6rem]'>Review & Confirm</h2>
                            <p className='text-text-darker font-medium'>Please double check your details before final submission.</p>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4" data-aos='fade-right' data-aos-duration='300'>
                                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                    <span className="text-slate-400 text-sm font-medium">Customer Name</span>
                                    <span className="text-white font-semibold text-sm">{username || 'John Doe'}</span>
                                </div>


                                <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                    <span className="text-slate-400 text-sm font-medium shrink-0">Service Address</span>
                                    <span className="text-white font-semibold text-sm text-right max-w-[200px] break-words">
                                        {bookingData.streetAddress}, {bookingData.apartment} {bookingData.city}
                                    </span>
                                </div>
                                <div className="flex justify-between items-start border-b border-white/5 pb-3">
                                    <span className="text-slate-400 text-sm font-medium shrink-0">Selected Date:</span>
                                    <span className="text-white font-semibold text-sm text-right">
                                        {bookingData.date}
                                    </span>
                                </div>


                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm font-medium">Payment Method</span>
                                    <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">
                                        💵 Cash on Delivery
                                    </span>
                                </div>
                            </div>
                        </>}
                        <div className='flex items-center gap-2 w-full self-center justify-between mt-5'>
                            { step !=1 && <button className='bg-white/30 text-center font-bold p-2 rounded-2xl hover:bg-white/40 flex-1 cursor-pointer' onClick={()=>setStep((prev)=> prev - 1)}>Back</button>}
                            {step !=3 &&<button className='bg-shield-bg text-center font-bold p-2 rounded-2xl hover:brightness-115 flex-1 disabled:opacity-50 disabled:pointer-events-none' onClick={()=>setStep((prev)=>prev + 1)} disabled={(step === 1 && (!bookingData.date || !bookingData.timeSlot || !bookingData.service) || step === 2 && (!bookingData.phone || !bookingData.apartment || !bookingData.streetAddress || !bookingData.city))}>Next</button>}
                            {step ===3 && <button className={`${Loading === 'notLoaded' ? 'bg-shield-bg' : Loading === 'loading' ? 'bg-shield-bg opacity-50' : 'bg-award-bg'} text-center font-bold p-2 rounded-2xl hover:brightness-115 flex-1  cursor-pointer flex justify-center`} onClick={handleBooking}>{
                                    Loading === 'notLoaded' ? 'Confirm' : Loading === 'loading' ? <LoaderCircle size={20} className='animate-spin'/> : 'Confirmed'
                                }</button>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 p-7 bg-nav-bg h-fit rounded-2xl border border-white/10 w-full sticky top-24'>
                        <h3 className='text-white font-bold text-2xl whitespace-nowrap'>Booking Summary</h3>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <span className='text-text-darker font-medium'>Service</span>
                                <span className='text-white font-bold text-[1.2rem]'>{viewedService?.title}</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-text-darker font-medium'>Estimated Duration</span>
                                <span className='text-white font-bold text-[1.2rem]'>{viewedService?.duration}</span>
                            </div>
                            <div className='self-center h-[1px] w-full bg-text-darker/20 my-3'></div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex justify-between'>
                                    <span className='text-text-darker font-medium'>Service</span>
                                    <span className='text-white font-medium'>${viewedService?.price_min}-${viewedService?.price_max}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-white font-bold text-[1.2rem]'>Total</span>
                                    <span className='text-shield-bg font-bold text-[1.2rem]'>${viewedService?.price_min}-${viewedService?.price_max}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}