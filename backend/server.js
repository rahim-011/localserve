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
    origin: [
        'https://localserve.vercel.app',                   
        
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            ip: req.ip || "127.0.0.1"
        });
        
        if (decision.isDenied()) {
            if (decision.reason.isBot()) {
                return res.status(403).json({ error: 'Bots do not have access' });
            }
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: 'Too many requests, please try again' });
            }
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        next();
    } catch (error) {
        console.error('Arcjet error:', error);
        next();
    }
});

app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/contact', contactRouter);

app.listen(PORT, () => {
    console.log(`Server is connected to port:${PORT}`);
});