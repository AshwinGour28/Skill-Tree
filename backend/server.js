import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/scan', resumeRoutes)
const PORT = process.env.PORT || 3000


mongoose.connect(process.env.MONGO_DB_URL).then(
    ()=>{
        console.log("MongoDB connected");
        app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
    } 
).catch(err=> console.error(err))