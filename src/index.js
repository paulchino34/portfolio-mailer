import express from 'express'
import dotenv from 'dotenv'
import mailRoutes from './api/index.js'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mailRoutes(app)

app.get('/', (req, res) => res.send('Mail server is up!'))

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})