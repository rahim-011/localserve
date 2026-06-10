import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet'
import { authRouter } from './routers/authRouter.js';
import { servicesRouter } from './routers/servicesRouter.js';
import { contactRouter } from './routers/contactRouter.js';
import { bookingRouter } from './routers/bookingRouter.js';
import aj from './config/arcjet.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'localserve-lpknx3dfj-rahim4.vercel.app' 
        : 'http://localhost:5173',
    credentials: true
}));



app.use(async (req,res,next)=>{
    const decision = await aj.protect(req,{
        ip: req.ip || "127.0.0.1", ///
        request:1
    })
    try{
        if (decision.isDenied()){
            if (decision.reason.isBot()){
                return res.status(403).json({error:'Bots doesn not have access'})
            }
            else if (decision.reason.isRateLimit()){
                return res.status(429).json({error:'To many requests please try again'})
            }
            else {
                return res.status(403).json({error:'Forbidden'})
            }
        }
        if (decision.results.some(result => result.isBot() && result.isSpoofed())){
            return res.status(403).json({error: 'Spoofed bot detected!'})
        }
        next()
    }
    catch(error){
        res.status(500).json({error:'Something went wrong!'})
        console.log('Something went wrong!',error)
    }
})


app.use('/api/auth',authRouter);
app.use('/api/services',servicesRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/contact',contactRouter);





app.listen(PORT,()=>{
    console.log(`Server is connected to port:${PORT}`);
})








