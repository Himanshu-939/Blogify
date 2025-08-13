import express from "express"
// can import like react by changing type to  module
import dotenv from "dotenv" 
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import cors from "cors"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1/user", userRoute)


app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server started at PORT: ${PORT}`);
})
