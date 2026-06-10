import { Search } from "lucide-react"
import Service from '../src/components/Service'
import {useServicesStore} from '../store/servicesStore.js'
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Services(){
     const {fetchAll,filterServices} =  useServicesStore();
    const [searchParams,setSearchParams] = useSearchParams();
    const category = searchParams.get('category') || 'All Categories';
    const type = searchParams.get('type') || 'Highest Rated';
    const search = searchParams.get('search') || '';
     useEffect(()=>{
        fetchAll();
     },[fetchAll])
     const filtredServices = filterServices(category,type);
     const searchedServices = search.length === 0 ? filtredServices : filtredServices.filter(service => service.title.toLowerCase().startsWith(search.toLocaleLowerCase()))
    return(
        <main className='min-h-screen w-full bg-dark-blue text-white flex flex-col'>
            <section className='w-full flex flex-col items-center justify-center min-h-[30vh] bg-hero-combined-bg p-4 shrink-0'>
                <div className='flex flex-col items-center gap-4 text-center' data-aos='fade-up'>
                    <h1 className='text-white font-bold text-5xl'>All Services</h1>
                    <p className='text-text-darker font-medium text-[1.2rem]'>Browse through our complete list of professional services</p>
                </div>
            </section>

            <section className='w-full flex flex-col items-center bg-dark-blue px-6 py-8 flex-grow'>
                <div className='flex flex-col gap-6 w-full max-w-[1250px] '>
                    
                    <div className="w-full bg-nav-bg/40 border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                        <div className="focus-within:border-blue-500 flex items-center gap-3 bg-nav-bg border border-white/10 px-4 py-2.5 rounded-xl w-full sm:flex-1 sm:max-w-[500px]">
                            <Search className="text-text-darker w-5 h-5 shrink-0" />
                            <input id="search" type="text" name="search" placeholder="Search services..." className="bg-transparent text-white placeholder-text-darker/60 focus:outline-none w-full font-medium" onChange={(e)=>{searchParams.set('search',e.target.value);setSearchParams(searchParams)}}/>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                            <div className="relative flex-1 sm:flex-none">
                                <select className="appearance-none bg-nav-bg text-white font-medium px-4 py-2.5 pr-10 rounded-xl border border-white/10 hover:border-white/30 focus:outline-none focus:border-shield-bg cursor-pointer transition-colors w-full sm:min-w-[180px]" value={category} onChange={(e)=>{searchParams.set('category',e.target.value);setSearchParams(searchParams)}}>
                                    <option value='All Categories'>All Categories</option>
                                    <option value='Home Services'>Home Services</option>
                                    <option value='Auto Services'>Auto Services</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-darker">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>

                            <div className="relative flex-1 sm:flex-none">
                                <select className="appearance-none bg-nav-bg text-white font-medium px-4 py-2.5 pr-10 rounded-xl border border-white/10 hover:border-white/30 focus:outline-none focus:border-shield-bg cursor-pointer transition-colors w-full sm:min-w-[180px]" value={type} onChange={(e)=>{searchParams.set('type',e.target.value);setSearchParams(searchParams)}}>
                                    <option value='Most Popular'>Most Popular</option>
                                    <option value='Highest Rated'>Highest Rated</option>
                                    <option value='Most Reviews'>Most Reviews</option>
                                    <option value='Name(A-Z)'>Name (A-Z)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-darker">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="text-text-darker font-medium text-lg block shrink-0">Showing {searchedServices.length} services</span>
                    
                    {searchedServices.length > 0 ? (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full pb-12'>
                        {searchedServices.map(service=>{
                            return (<Service service={service} key={service.id} duration={'300'} animation='zoom-in'/>)
                        })}
                    </div>) : 
                    <div className="flex flex-col gap-4 items-center justify-center mt-8">
                        <div className="bg-white/20 p-5 rounded-full flex items-center"><Search size={40}/></div>
                        <h4 className="text-white font-bold text-[1.2rem]">No services found</h4>
                        <p className="text-text-darker font-medium text-center">Try adjusting your search or filters.</p>
                    </div>}
                </div>
            </section>
        </main>
    )
}