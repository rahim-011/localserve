import { Mail, Phone, Send, MapPin, Clock } from 'lucide-react'
import API from '../models/api';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function Contact() {
    const askedQuestions = [
        {question:'How do I book a service?', answer:'Simply browse our services, select the one you need, choose a date and time, and complete the booking form.'},
        {question:'Can I cancel or reschedule?', answer:'Yes, you can cancel or reschedule up to 24 hours before your appointment through your dashboard.'},
        {question:'Are all professionals verified?', answer:'Yes, all service providers are background-checked, licensed, and insured for your safety.'},
        {question:'What payment methods do you accept?', answer:'We accept all major credit cards, debit cards, and cash payments upon service completion.'}
    ];

    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false);

    const handleContactData = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError(null);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await API.post('/contact', data);
            setError(response.data?.error);
            if (response.data.success) {
                setError(false)
                toast.success(response.data.message, {
                    id: 'contact-success',
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
                e.target.reset();
            } else {
                setError(true);
                toast.error(response.data?.error || 'Failed to send message', {
                    id: 'contact-error',
                    style: {
                        background: '#111625',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                    },
                });
            }
        } catch (error) {
            setError(true)
            toast.error(error?.response?.data.error, {
                id: 'contact-server-error',
                style: {
                    background: '#111625',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                },
            });
        } finally {
            setTimeout(()=>{
                setLoading(false);
            },500)
        }
    }

    return (
        <main className="flex flex-col flex-grow items-center min-h-screen bg-dark-blue">
            <section className="flex flex-col items-center bg-hero-combined-bg w-full md:p-6">
                <div className="flex flex-col gap-3 items-center p-9" data-aos='fade-up'>
                    <h1 className="text-white font-bold text-4xl text-center md:text-5xl">Get in Touch</h1>
                    <p className='text-text-darker font-medium text-[0.9rem] text-center max-w-2xl md:text-[1.1rem]'>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            <section className='w-full bg-dark-blue flex flex-col items-center justify-center  my-12 md:p-6'>
                <div className='flex flex-col gap-8 items-center w-full max-w-7xl px-4 overflow-hidden'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start'>
                        <div className='flex flex-col gap-6 bg-nav-bg rounded-2xl p-7 border border-white/5 shadow-xl' data-aos='fade-right' data-aos-duration='400'>
                            <h2 className='text-white font-bold text-2xl'>Send us a Message</h2>
                            <form className='flex flex-col gap-4' onSubmit={handleContactData}>
                                <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                                    <div className='flex flex-col gap-1.5 w-full sm:flex-1'>
                                        <label htmlFor="firstname" className='text-white font-medium text-sm'>First Name</label>
                                        <input id="firstname" type="text" name='firstName' required placeholder="John" className={`rounded-2xl border border-white/10 bg-dark-blue/35 p-3 text-white outline-none focus:border-shield-bg transition-colors placeholder:text-slate-500 disabled:opacity-50`} disabled={loading}/>
                                    </div>
                                    <div className='flex flex-col gap-1.5 w-full sm:flex-1'>
                                        <label htmlFor="lastname" className='text-white font-medium text-sm'>Last Name</label>
                                        <input id="lastname" type="text" name="lastName" required placeholder="Doe" className={`rounded-2xl border border-white/10 bg-dark-blue/35 p-3 text-white outline-none focus:border-shield-bg transition-colors placeholder:text-slate-500 disabled:opacity-50`} disabled={loading}/>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1.5 relative'>
                                    <label htmlFor="email" className='text-white font-medium text-sm'>Email Address</label>
                                    <input type="email" id="email" name="email" required placeholder="john@example.com" className={`rounded-2xl border border-white/10 bg-dark-blue/35 p-3 text-white outline-none focus:border-shield-bg transition-colors placeholder:text-slate-500 disabled:opacity-50`} disabled={loading}/>
                                </div>
                                <div className='flex flex-col gap-1.5 relative'>
                                    <label htmlFor="phone" className='text-white font-medium text-sm'>Phone Number</label>
                                    <input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567" className={`rounded-2xl border  bg-dark-blue/35 p-3 text-white outline-none ${!error ? 'border-white/10 focus:border-shield-bg' : 'focus:border-red-600 border-red-600'} transition-colors placeholder:text-slate-500 disabled:opacity-50`} disabled={loading}/>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label htmlFor="subject" className='text-white font-medium text-sm'>Subject</label>
                                    <input type="text" name="subject" id="subject" placeholder="How can we help you?" required className={`rounded-2xl border border-white/10 bg-dark-blue/35 p-3 text-white outline-none focus:border-shield-bg transition-colors placeholder:text-slate-500 disabled:opacity-50`} disabled={loading}/>
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label htmlFor="message" className='text-white font-medium text-sm'>Message</label>
                                    <textarea name="message" id="message" rows="4" required placeholder="Tell us more about your inquiry..." className={`rounded-2xl border border-white/10 bg-dark-blue/35 p-3 text-white outline-none focus:border-shield-bg transition-colors resize-none placeholder:text-slate-500 disabled:opacity-50`} disabled={loading}></textarea>
                                </div>
                                <button type="submit" className='flex justify-center self-center rounded-2xl bg-shield-bg font-bold text-white gap-2 w-full items-center p-3 hover:brightness-115 transition-all cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed' disabled={loading}>
                                    <Send size={18} />
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        <div className='flex flex-col gap-6 w-full' data-aos='fade-left' data-aos-duration='400'>
                            <div className='bg-nav-bg rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col gap-5'>
                                <h3 className='text-white font-bold text-xl'>Contact Information</h3>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex gap-4 items-start'>
                                        <div className='p-3 bg-dark-blue/50 rounded-xl border border-white/5 text-shield-bg mt-1 shrink-0'>
                                            <Phone size={20} />
                                        </div>
                                        <div className='flex flex-col gap-0.5'>
                                            <h4 className='text-slate-400 font-medium text-sm'>Phone</h4>
                                            <span className='text-white font-semibold text-[1.05rem]'>1-800-LOCAL-SRV</span>
                                            <span className='text-text-darker text-sm font-medium'>Mon-Fri: 8am - 8pm</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 items-start'>
                                        <div className='p-3 bg-dark-blue/50 rounded-xl border border-white/5 text-shield-bg mt-1 shrink-0'>
                                            <Mail size={20} />
                                        </div>
                                        <div className='flex flex-col gap-0.5'>
                                            <h4 className='text-slate-400 font-medium text-sm'>Email</h4>
                                            <span className='text-white font-semibold text-[1.05rem]'>support@localserve.com</span>
                                            <span className='text-text-darker text-sm font-medium'>We'll respond within 24 hours</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 items-start'>
                                        <div className='p-3 bg-dark-blue/50 rounded-xl border border-white/5 text-shield-bg mt-1 shrink-0'>
                                            <MapPin size={20} />
                                        </div>
                                        <div className='flex flex-col gap-0.5'>
                                            <h4 className='text-slate-400 font-medium text-sm'>Office</h4>
                                            <span className='text-white font-semibold text-[1.05rem]'>123 Service Street</span>
                                            <span className='text-text-darker text-sm font-medium'>City, ST 12345</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-nav-bg rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col gap-4'>
                                <h3 className='text-white font-bold text-xl flex items-center gap-2'>
                                    <Clock className='text-shield-bg' size={22} />Business Hours
                                </h3>
                                <div className='flex flex-col gap-3 font-medium text-[0.95rem]'>
                                    <div className='flex justify-between items-center text-text-darker border-b border-white/5 pb-2'>
                                        <span>Monday - Friday</span>
                                        <span className='text-white font-semibold'>8:00 AM - 8:00 PM</span>
                                    </div>
                                    <div className='flex justify-between items-center text-text-darker border-b border-white/5 pb-2'>
                                        <span>Saturday</span>
                                        <span className='text-white font-semibold'>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className='flex justify-between items-center text-text-darker'>
                                        <span>Sunday</span>
                                        <span className='text-white font-semibold'>10:00 AM - 4:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full bg-nav-bg rounded-2xl p-2 border border-white/5 shadow-xl flex flex-col items-center justify-center text-center gap-3 min-h-[350px]'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204740.5575692031!2d2.927413580548274!3d36.69682662880137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e521f646e1edb%3A0x35c0e93b4118c15d!2sWilaya%20d&#39;Alger!5e0!3m2!1sfr!2sdz!4v1780609602184!5m2!1sfr!2sdz" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl min-h-[350px] invert-[90%] hue-rotate-180 contrast-125 brightness-90 grayscale-[20%]"></iframe>
                    </div>
                </div>
            </section>
            
            <section className='bg-nav-bg w-full flex items-center justify-center p-2 mb-9 md:p-6'>
                <div className='flex flex-col gap-6 p-5 max-w-5xl w-full'>
                    <div className='flex flex-col gap-4 p-5 items-center'>
                        <h3 className='text-white font-bold text-3xl text-center'>Frequently Asked Questions</h3>
                        <p className='font-medium text-text-darker text-center'>Quick answers to common questions</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full'>
                        {askedQuestions.map((askedQuestion, index) => (
                            <div className='flex flex-col gap-4 p-6 rounded-2xl bg-dark-blue/60 border border-white/10' key={index} data-aos='fade-up'>
                                <h4 className='text-white text-[1.2rem] font-bold'>{askedQuestion.question}</h4>
                                <p className='text-text-darker leading-relaxed'>{askedQuestion.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}