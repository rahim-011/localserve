import { create } from "zustand";
import API from "../models/api";


export const useServicesStore = create((set,get)=>({
    allServices:[],
    viewedService:null,
    fetchAll : async () =>{
        if (get().allServices.length > 0) return;
        try{
            const response = await API.get('/services/all');
            const {services} = response.data;
            set({allServices:services})
        }   
        catch(error){
            console.log('Error on fetching the services!',error)
        }
    },
    fetchService : (serviceId) =>{
        try{
            const service = get().allServices.find((service)=> service.id == serviceId);
            set({viewedService:service})
        }
        catch(error){
            console.log('Error on fetching the service!',error)
        }
    },
    filterServices : (category,type) =>{
        const filterByType = (type) =>{
            switch (type){
                case ('Name(A-Z)'):
                    return [...get().allServices].sort((a, b) => a.title.localeCompare(b.title));
                case ('Most Popular'):
                    return get().allServices.filter(service =>service.reviews_count >= 300);
                case ('Most Reviews'):
                    return get().allServices.filter(service =>service.reviews_count > 250);
                default :
                    return get().allServices;
            }
        }
        return filterByType(type).filter(service =>{
            if (category === 'All Categories' || category === '') return true;
            return service.category === category ;
        })
    }


}));