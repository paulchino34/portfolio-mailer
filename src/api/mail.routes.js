import { Router } from "express";
import { sendMail } from './mail.handler.js'

const mailRoutes = Router()

mailRoutes.post('/send', sendMail)

export default mailRoutes