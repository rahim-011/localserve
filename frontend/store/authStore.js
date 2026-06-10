import { create } from "zustand";
import API from "../models/api";


const useAuthStore = create((set) => ({
    isLoading:false,
    isAuthenticated:!!localStorage.getItem('token'),
    error:null,
    token:localStorage.getItem('token') || null,
    userInfos:null,
    
    login : async (username,password,rememberMe) =>{
        set({isLoading:true,error:null});
        try{
            const response = await API.post('/auth/login',{username,password,rememberMe});
            const {token,message,user} = response.data;
            localStorage.setItem('token',token);

            set({
                token:token,
                isLoading:false,
                isAuthenticated:true,
                userInfos:user
            })
            return { success: true, message };

        }
        catch(error){
            const errMsg = error.response?.data?.error || 'Inxpected error!';
            set({error:errMsg,isLoading:false,isAuthenticated:false})
        }
    },
    logout: () =>{
        localStorage.removeItem('token');
        set({userInfos:null,token:null,error:null,isAuthenticated:false})
    },
    signUp : async (username,email,password)=>{
        try{
            const response  = await API.post('/auth/signUp',{username,password,email});
            if (response.data.success){
                set({userInfos:response.data.user,isAuthenticated:true})
                return {success:true}
            }
            return {success:false,error:response?.data.error || 'Error on signUp'}
        }
        catch(error){
            console.log(error);
            const errorMsg = error.response?.data.error || 'Internal server error';
            return {success:false,error:errorMsg}
        }
    },
    checkAuth: async () =>{
        const token = localStorage.getItem('token');
            if (!token){
                return set({isAuthenticated:false,userInfos:null,isLoading:false})
            }
        set({isLoading:true})
         try{
            const response = await API.get('/auth/me');
            set({isAuthenticated:true,userInfos:response.data.user,isLoading:false})
         }
         catch(error){
            localStorage.removeItem('token');
            set({isAuthenticated:false,userInfos:null,isLoading:false})
         }
    },
    updateUserInfos: (updatedData) =>{
        const newData = Object.fromEntries(Object.entries(updatedData).filter(([__,value])=>value!=null));
        set((state)=>({
            userInfos:{
                ...state.userInfos,
                ...newData
            }
        }))
    }

}));

export default useAuthStore;