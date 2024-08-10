import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://p021097:021097@cluster0.wn41y.mongodb.net/trn-app')
    .then(()=>{
        console.log('DB Connected');
        
    })
}