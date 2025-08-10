import { z } from "zod";
import UserFeedback from "./db";
import { ConnectDB } from "@/connectdb/connectdb";
import { NextResponse } from "next/server";

const zodCheck = z.object({
    rating : z.number().min(1),
    feedback : z.string().min(5).max(50),
});

export async function POST(req: Request) {

    try {
        ConnectDB();
        const body = await req.json();
        const parsed = zodCheck.safeParse(body);
        if(!parsed.success){
            return NextResponse.json({message : "incorrect format"}, {status : 400});
        }
        const { rating, feedback } = parsed.data;

        const user = new UserFeedback({
            rating,
            feedback
        })
        await user.save();
        return NextResponse.json({ message: "feedback sent" }, { status: 201 });


    }
    catch (e: unknown) {
        console.log(e)
        return NextResponse.json({ error: "something went wrong" }, { status: 500 });
    }
}