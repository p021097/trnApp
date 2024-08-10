import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import trnRouter from './routes/trnRoute.js'


// app config
const app = express()
const port = 4000


// middleware
app.use(express.json())
app.use(cors())


// db Connection 
connectDB()

// Api endpoints
app.use('/api/trn', trnRouter)


app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

// mongodb+srv://p021097:<password>@cluster0.wn41y.mongodb.net/?