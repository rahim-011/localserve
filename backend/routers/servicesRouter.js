import express from 'express'
import { getAllServices} from '../controllers/servicesController.js';


export const servicesRouter = express.Router();

servicesRouter.get('/all',getAllServices);