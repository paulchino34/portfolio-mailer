import mailRouter from './mail.routes.js'

const mailRoutes = (app) => {
    app.use('/api/mail', mailRouter)
}

export default mailRoutes