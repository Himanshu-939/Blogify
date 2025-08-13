import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try{
        const{firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success:false,
                message:"Invalid email"
            })
        }

        if(password.length<6){
            return res.status(400).json({
                success:false,
                message:"Password must be atleast 6 characters"
            })
        }
{/*Might possible that the already exist so it cant  register have to login */}

        const existingUserByEmail = await User.findOne({email : email})
        if(existingUserByEmail){
            return res.status(400).json({
                success:false,
                message:"Email already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email,
            password : hashPassword
        })
        return res.status(201).json({
            success:true,
            message:"Account created suuccessfully"
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"Failed to register"
        })
    }
}


export const login = async(req, res) => {
    try{
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fileds required"
            })
        }
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email"
            })
        }
        //bcrypt has method to verify the password .compare(inserted_pass, stored_pass)
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                seccess:false,
                message:"Invalid password"
            })
        }
        //now if logged in so will generate token and store in cookie

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY,{expiresIn:"1d"});
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            success:true,
            message:`Welcome back ${user.firstName}`,
            user
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message:"Failed to register"
        })
    }
}


export const logout = async (_, res) => { 
    try {
        //now just finish the cookie
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


