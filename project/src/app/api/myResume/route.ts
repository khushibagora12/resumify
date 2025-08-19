import MyRes from "./db";
import { ConnectDB } from "@/connectdb/connectdb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req : Request){
    console.log("route.ts hit");
    try{
        const session = await getServerSession(authOptions)

        console.log("in try block")
        await ConnectDB();
        const body = await req.json();
        console.log("in route: " + body.resumePdf);
        console.log("id: ", session?.user.id)
        const user = new MyRes({
            id : session?.user.id,
            resumePdf : body.resumePdf
        })
        await user.save();
        return NextResponse.json({message : "pdf saved"});
    }
    catch(e : unknown){
        console.log("error: ", e)
        return NextResponse.json({error : "something went wrong"}, {status : 500});
    }
}

export async function GET() {
    console.log("get function")
    try{
        const session = await getServerSession(authOptions)
        await ConnectDB();
        const userData = await MyRes.find({id: session?.user.id});
        if(!userData){
            NextResponse.json({message : "not found"})
        }
        console.log("userdata = " , userData)
        return NextResponse.json(userData);
    }
    catch(e : unknown){
        console.log("error: ", e)
        return NextResponse.json({error : "something went wrong"}, {status : 500})
    }
}