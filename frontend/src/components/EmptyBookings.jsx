import { ClipboardX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyBookings() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center p-12 bg-nav-bg border border-white/10 rounded-2xl text-center w-full max-w-2xl mx-auto my-8" data-aos="fade-up">
            
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-5 text-text-darker/60">
                <ClipboardX size={32} className="text-shield-bg animate-pulse" />
            </div>

            <h3 className="text-white font-bold text-xl mb-2">No Bookings Yet</h3>
            <p className="text-text-darker text-sm max-w-sm mb-6">
                You haven't ordered any services yet. Book your first professional service now!
            </p>

            <button 
                onClick={() => navigate("/services")}
                className="bg-shield-bg text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer shadow-lg shadow-shield-bg/10"
            >
                Book a Service
            </button>
        </div>
    );
}