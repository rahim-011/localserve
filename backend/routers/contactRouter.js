import express from 'express'
import saveContactInfos from '../controllers/contactController.js';




export const contactRouter = express.Router();

contactRouter.post('/',saveContactInfos)