import nodemailer from 'nodemailer'
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

const sendMail = (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body
    const contentHTLM = `
        <h1>User information ${firstName} ${lastName}</h1>
        <ul>
            <li><p>Mail: ${email}</p></li>
            <li><p>Phone: ${phone}</p></li>
            <li><p>Message: ${message}</p></li>
        </ul>
    `

    const oAuth2Client = new OAuth2(
        process.env.MAIL_CLIENT_ID,
        process.env.MAIL_CLIENT_SECRET,
        process.env.MAIL_REDIRECT_URI
    )

    oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN })

    const sendFromGmail = async () => {
        try {
            const accessToken = await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.MAIL_FROM,
                    clientId: process.env.MAIL_CLIENT_ID,
                    clientSecret: process.env.MAIL_CLIENT_SECRET,
                    refreshToken: process.env.MAIL_REFRESH_TOKEN,
                    accessToken
                }
            })

            transporter.verify((error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Ready to Send")
                }
            })

            const mailOptions = {
                from: process.env.MAIL_FROM,
                to: 'paul-jara@hotmail.com',
                subject: 'Aviso de interes para Prestación de servicios',
                html: contentHTLM
            }
            const result = await transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(error)
        }
    }
    sendFromGmail()
        .then(result => res.status(200).send('Message Sent'))
        .catch(error => console.log(error))
}

export { sendMail }