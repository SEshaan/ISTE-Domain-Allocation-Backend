import type { Request, Response } from "express";
import type { UserInterface } from "../../types/user.js";
import { User } from "../../models/user.js";

export const loginOrSignup = async (req: Request, res: Response) => {
    try{
        const user: UserInterface | undefined = req.user;
        if(!user){
            return  res.status(401).json({message: "Unauthorized: No user information provided"});
        }

        const userFound = await User.findOneAndUpdate(
            {email: user.email},
            {
                $setOnInsert: user
            },
            {
                upsert: true,
                new: true
            }
        ).lean();

        res.json({message: "Logged in successfully", user: userFound});
    }
    catch(err){
        console.error("Error while login: "+ err);
        res.status(500).json({message: "Internal Server Error"});
    }
}