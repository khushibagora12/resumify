import User from "@/models/userModel";
import { ConnectDB } from "@/connectdb/connectdb";
import {NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

 const userParse = z.object({
    username: z.string().min(3).max(50),
    email: z.string().min(5).max(50).email({ message: "please enter a valid email" }),

    password: z.string().min(8,
        { message: "Be at least 8 characters long" }
    )
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {message: 'Contain at least one special character.',})
        .max(20)
})
export async function POST(req: NextRequest) {
    try {
        await ConnectDB();

        const body = await req.json();

        //validate data from zod
        const parsed = userParse.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: "incorrect format" });
        } 
        const { username, email, password } = parsed.data;

        //check if user already exist
        const ifExist = await User.findOne({email});
        if(ifExist){
            return NextResponse.json({message : "This email already have an account!"});
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save();
        return NextResponse.json({ message: "user signed up successfully" });
    }
    catch (e: unknown) {
        console.log("error: ", e)
        return NextResponse.json({ error: "something went kwrong" }, { status: 500 });
    }
}
export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        const findUser = await User.findById(session?.user.id)
        if(!findUser){
            return NextResponse.json({message: "not found"})
        }
        console.log("user: ",findUser)
        return NextResponse.json(findUser)

    } catch (error: unknown) {
        console.log("error in getting signup details ", error)
        return NextResponse.json({message: "something went wrong in getting signup details"})
    }
}