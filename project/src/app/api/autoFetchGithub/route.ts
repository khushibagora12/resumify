import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const res = await fetch(`https://api.github.com/users/${body.username}/repos`, {
            method: "GET",
        })
        const data = await res.json()
        console.log("git: ", data)
        return NextResponse.json(data)
    } 
    catch (error: unknown) {
        console.log("error in fetching github repos")
        return NextResponse.json({ error: "something went wrong" })
    }
}


