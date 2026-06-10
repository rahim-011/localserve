import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Home from "../pages/Home.jsx"
import Services from "../pages/Services.jsx"
import Emergency from "../pages/Emergency.jsx"
import { BrowserRouter,Route,Routes, useLocation } from "react-router-dom"
import Booking from "../pages/Booking.jsx"
import Contact from "../pages/Contact.jsx"
import { useEffect } from "react";
import  AOS from 'aos';
import 'aos/dist/aos.css';
import Register from "../pages/Register.jsx"
import Confirm from "../pages/Confirm.jsx"
import ServiceView from "../pages/ServiceView.jsx"
import {Toaster} from 'react-hot-toast'
import Dashboadrd from "../pages/Dashboard.jsx"
import EditProfile from "../pages/EditProfile.jsx"
import useAuthStore from "../store/authStore.js"
import Verification from "./components/Verfication.jsx"

function AppContent(){
  const {checkAuth,isLoading} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  const location = useLocation();
  const hide = location.pathname === '/register';
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location.pathname])
  if(!isLoading){
    return(
    <>
      {!hide && <Navbar/>}
        <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='/confirm' element={<Confirm/>}></Route>
          </Route>
          <Route path='/services' element={<Services/>}></Route>
          <Route path='/booking/:id' element={<Booking/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/emergency' element={<Emergency/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/service/:id' element={<ServiceView/>}></Route>
          <Route path='/dashboard' element={<Dashboadrd/>}></Route>
          <Route path='/settings' element={<EditProfile/>}>
            <Route path='verification' element={<Verification/>}></Route>
          </Route>
        </Routes>
        {!hide && <Footer/>}
      </>
    )

  }
}
  
export default function App(){
  useEffect(()=>{
    AOS.init({
      duration: 800,
      once:true,
      easing: 'ease-out-cubic'
    });
  },[])
  return(
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent/>
    </BrowserRouter>
  )
}