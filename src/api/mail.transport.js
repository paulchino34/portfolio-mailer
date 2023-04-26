import dotenv from 'dotenv'
dotenv.config()

const mailTransport = {
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_FROM,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN
    }
}

export default mailTransport;