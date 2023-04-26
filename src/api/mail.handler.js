import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import mailTransport from './mail.transport.js'
const OAuth2 = google.auth.OAuth2

const mailAuth = async (callback) => {

    console.log(mailTransport)
    const oAuth2Client = new OAuth2(
        mailTransport.auth.clientId,
        mailTransport.auth.clientSecret,
        process.env.MAIL_REDIRECT_URI
    )

    oAuth2Client.setCredentials({
        refresh_token: mailTransport.auth.refreshToken,
        tls: {
            rejectUnauthorized: false
        }
    })

    oAuth2Client.getAccessToken((error, token) => {
        if (error) {
            return console.log(error)
        }
        mailTransport.auth.refreshToken = token

        callback(nodemailer.createTransport(mailTransport))
    })
}

const sendMail = (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body

    const buildAndSend = async (transport) => {
        try {
            await transport.verify()
            console.log("Ready to Send")
        } catch (error) {
            console.log(error)
        }

        const contentHTLM =
            `<h1>User information ${firstName} ${lastName}</h1>
            <ul>
                <li><p>Mail: ${email}</p></li>
                <li><p>Phone: ${phone}</p></li>
                <li><p>Message: ${message}</p></li>
            </ul>`

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: 'paul-jara@hotmail.com',
            subject: 'Aviso de interes para Prestación de servicios',
            html: contentHTLM
        }

        const result = await transport.sendMail(mailOptions)
    }

    mailAuth(buildAndSend)
        .then(result => res.status(200).send('Message Sent'))
        .catch(error => console.log(error))
}

export { sendMail }