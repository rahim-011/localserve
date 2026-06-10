import { Shield, Clock, Award, Phone, ArrowRight, Key } from 'lucide-react'
import Service from '../src/components/Service'
import Review from '../src/components/Review'
import { Link,Outlet } from 'react-router-dom'
import heroImg from '../src/assets/photo-1584677191047-38f48d0db64e.jpeg'
import { useServicesStore } from '../store/servicesStore'
import { useEffect } from 'react'

export default function Home() {
    const {allServices,fetchAll} = useServicesStore();
    useEffect(()=>{
        fetchAll();
    },[])
    const reviews = [
    {
        id:1,
        name: 'Sarah Johnson',
        comment: 'Excellent service! The electrician was professional and fixed the issue quickly.',
        service: 'Electrician',
        date: '2026-03-20'
    },
    {
        id:2,
        name: 'Mike Chen',
        comment: 'Very reliable plumber. Solved our emergency leak within an hour of calling.',
        service: 'Plumber',
        date: '2026-03-18'
    },
    {
        id:3,
        name: 'Emily Davis',
        comment: 'The cleaning team did an amazing job! My house looks brand new.',
        service: 'Cleaning Service',
        date: '2026-03-15'
    },
    {
        id:4,
        name: 'David Wilson',
        comment: 'Outstanding job on the AC maintenance. The technician explained everything clearly and optimized the system.',
        service: 'AC Repair',
        date: '2026-03-22'
    }];
    return (
        <main className='w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-dark-blue'>
            <section className='w-full min-h-screen lg:min-h-[75vh] bg-hero-combined-bg text-white flex justify-center items-center py-12 lg:py-0'>
                <article className='flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl px-4 md:px-8 w-full' >
                    <div className='flex flex-col gap-6 flex-1 text-center lg:text-left items-center lg:items-start w-full order-2 lg:order-1' data-aos='fade-right'>
                        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-text leading-tight max-w-xl lg:max-w-none'>
                            Find Trusted <span className='bg-logo-gradient bg-clip-text text-transparent'>Local Services</span> Near You
                        </h1>
                        <p className='text-text-darker text-base sm:text-lg font-medium max-w-xl lg:max-w-none'>
                            Connect with verified professionals for all your home and auto service needs. Book instantly and get the job done right.
                        </p>
                        <div className='flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 items-center w-full mt-2'>
                            <div className='flex flex-col items-center gap-2 font-bold'>
                                <span className='bg-shield-bg/15 p-3 rounded-full shrink-0 flex items-center justify-center'>
                                    <Shield className='text-shield-bg shrink-0' size={22} />
                                </span>
                                <span className='text-sm sm:text-base whitespace-nowrap'>Verified Pros</span>
                            </div>
                            <div className='flex flex-col items-center gap-2 font-bold'>
                                <span className='bg-clock-bg/15 p-3 rounded-full shrink-0 flex items-center justify-center'>
                                    <Clock className='text-clock-bg shrink-0' size={22} />
                                </span>
                                <span className='text-sm sm:text-base whitespace-nowrap'>Fast Service</span>
                            </div>
                            <div className='flex flex-col items-center gap-2 font-bold'>
                                <span className='bg-award-bg/15 p-3 rounded-full shrink-0 flex items-center justify-center'>
                                    <Award className='text-award-bg shrink-0' size={22} />
                                </span>
                                <span className='text-sm sm:text-base whitespace-nowrap'>Top Rated</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full max-w-md lg:max-w-[50%] flex-1 shrink-0 order-1 lg:order-2 px-4 lg:px-0' data-aos='fade-left'>
                        <img src={heroImg} alt="Home Services" className='rounded-2xl w-full h-64 sm:h-80 lg:h-auto object-cover shadow-2xl' />
                    </div>
                </article>
            </section>

            <section className='w-full min-h-[75vh] bg-dark-blue text-white flex flex-col justify-center items-center gap-8 py-16 px-4 md:px-8'>
                <div className='flex flex-col gap-3 max-w-7xl w-full'>
                    <div className='flex flex-col items-center text-center gap-3 mb-4'>
                        <h2 className='text-3xl sm:text-4xl font-bold' data-aos='fade-up'
                        >Featured Services</h2>
                        <p className='text-base sm:text-lg text-text-darker font-medium'>
                            Popular services trusted by thousands of customers
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4'>
                        {allServices.slice(0,4).map(service =>{
                            return (<Service animation='zoom-in' duration={100 * service.id} key={service.id} service={service}/>)
                        })}
                    </div>
                </div>
                <div className='mt-4'>
                    <Link to="/services" className='flex items-center gap-2 font-bold px-5 py-3 bg-nav-bg border border-white/20 rounded-2xl hover:bg-nav-bg/60 shadow-xl transition-all active:scale-95 shrink-0'>
                        <span className='whitespace-nowrap text-sm sm:text-base'>View All Services</span> 
                        <ArrowRight size={18} className='shrink-0' />
                    </Link>
                </div>
            </section>

            <section className='w-full bg-nav-bg flex items-center justify-center flex-col py-16 px-4 md:px-8 border-y border-white/5'>
                <div className='flex flex-col gap-10 w-full max-w-7xl'>
                    <div className='flex flex-col gap-3 text-center'>
                        <h2 className='text-white font-bold text-3xl sm:text-4xl' data-aos='fade-up'>What Our Customers Say</h2>
                        <p className='text-text-darker font-medium text-base sm:text-lg'>
                            Real reviews from real customers
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch'>
                        {reviews.map(review =>{
                            return(
                                <Review animation='fade-up' duration={review.id * 100} review={review} key={review.id}/>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className='w-full bg-dark-blue flex items-center justify-center py-16 px-4 md:px-8'>
                <div className='flex flex-col gap-16 w-full max-w-7xl items-center'>
                    <div className='flex flex-col items-center gap-6 border border-emerg-red/30 p-6 sm:p-8 rounded-3xl bg-emerg-red/5 max-w-[650px] w-full mx-auto shadow-xl' data-aos='fade-up'>   
                        <div className='flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left w-full'>
                            <div className='text-white bg-emerg-red p-4 rounded-full shrink-0 flex items-center justify-center shadow-lg shadow-emerg-red/20 animate-pulse'>
                                <Phone size={32} className='shrink-0' />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <h3 className='text-white text-xl sm:text-2xl font-bold'>Need Emergency Help?</h3>
                                <p className='font-medium text-text-darker text-sm sm:text-base'>
                                    We're available 24/7 for urgent service needs
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-center gap-4 items-center w-full mt-2'>
                            <Link to="/emergency" className='w-full sm:w-auto flex bg-emerg-red px-5 py-3 rounded-2xl font-bold text-white gap-2.5 shrink-0 items-center justify-center hover:brightness-115 transition-all active:scale-95'>
                                <Phone size={18} className='shrink-0' /> 
                                <span className='whitespace-nowrap text-sm sm:text-base'>Emergency Services</span>
                            </Link>
                            <a href="tel:1800" className='w-full sm:w-auto font-bold text-white border border-white/10 px-5 py-3 rounded-2xl bg-nav-bg/40 shrink-0 text-center hover:bg-nav-bg/60 transition-all active:scale-95 text-sm sm:text-base'>
                                Call Now
                            </a>
                        </div>
                    </div>

                    <div className='flex flex-col gap-8 w-full mt-4'>
                        <div className='flex flex-col gap-3 text-center'>
                            <h2 className='text-white font-bold text-3xl sm:text-4xl'>Why Choose LocalServe?</h2>
                            <p className='text-text-darker text-base sm:text-lg'>
                                The smart way to find and book local services
                            </p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-6 mt-4'>
                            <article className='bg-nav-bg p-6 sm:p-8 flex flex-col items-center text-center justify-start gap-4 sm:gap-5 rounded-3xl border border-white/5 shadow-xl' data-aos='zoom-in' data-aos-duration='100'>
                                <span className='text-shield-bg bg-shield-bg/15 p-4 rounded-2xl shrink-0 flex items-center justify-center'>
                                    <Shield size={32} className='shrink-0' />
                                </span>
                                <h4 className='text-white font-bold text-xl sm:text-2xl whitespace-nowrap'>Verified Professionals</h4>
                                <p className='text-text-darker text-sm sm:text-base font-medium max-w-xs'>
                                    All service providers are background-checked and verified
                                </p>
                            </article>
                            <article className='bg-nav-bg p-6 sm:p-8 flex flex-col items-center text-center justify-start gap-4 sm:gap-5 rounded-3xl border border-white/5 shadow-xl' data-aos='zoom-in' data-aos-duration='200'>
                                <span className='text-clock-bg bg-clock-bg/15 p-4 rounded-2xl shrink-0 flex items-center justify-center'>
                                    <Clock size={32} className='shrink-0' />
                                </span>
                                <h4 className='text-white font-bold text-xl sm:text-2xl whitespace-nowrap'>Instant Booking</h4>
                                <p className='text-text-darker text-sm sm:text-base font-medium max-w-xs'>
                                    Book services online in just a few clicks
                                </p>
                            </article>
                            <article className='bg-nav-bg p-6 sm:p-8 flex flex-col items-center text-center justify-start gap-4 sm:gap-5 rounded-3xl border border-white/5 shadow-xl' data-aos='zoom-in' data-aos-duration='300'>
                                <span className='text-award-bg bg-award-bg/15 p-4 rounded-2xl shrink-0 flex items-center justify-center'>
                                    <Award size={32} className='shrink-0' />
                                </span>
                                <h4 className='text-white font-bold text-xl sm:text-2xl whitespace-nowrap'>Quality Guarantee</h4>
                                <p className='text-text-darker text-sm sm:text-base font-medium max-w-xs'>
                                    100% satisfaction guarantee on all services
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
            <Outlet />
        </main>
    )
}