import { ConnectDB } from "@/connectdb/connectdb";
import Info from "./db"
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// const certificateSchema = z.object({
//     certName : z.string().min(3).max(20),
//     file : z.any()
// });

// const infoStructure = z.object({
//     fullName: z.string().max(50).min(4),    
//     profession: z.string().max(20).min(4),
//     email: z.string().min(4).max(40).email(),
//     contact: z.string().max(10),
//     about : z.string().min(100).max(500),
//     technicalSkills: z.string().min(3).max(50).array(),
//     nontechnicalSkills: z.string().min(3).max(50).array(),
//     school10: z.string().min(3).max(100),
//     board10: z.string().min(3).max(10),
//     percentage10: z.number().min(0).max(100),
//     school12: z.string().min(3).max(100),
//     board12: z.string().min(3).max(10),
//     percentage12: z.number().min(0).max(100),
//     college: z.string().min(3).max(100),
//     degree: z.string().min(3).max(10),
//     cgpa: z.number().min(0).max(10),
//     startYear: z.number(),
//     endYear: z.number(),
//     certificates : z.array(certificateSchema)
// });

export async function POST(req: Request) {
    const body = await req.json()
    console.log("Request body:", body)
    const session = await getServerSession(authOptions)
    try {
        await ConnectDB()
        const findUser = await Info.findOneAndUpdate({ id: session?.user.id }, {
            id: session?.user.id,
            fullName: body.fullName,
            profession: body.profession,
            email: body.email,
            contact: body.contact,
            about: body.about,
            socials: body.socials,
            technicalSkills: body.technicalSkills,
            nontechnicalSkills: body.nontechnicalSkills,
            hobbies: body.hobbies,
            projects: body.projects,
            experience : body.experience,
            school10: body.school10,
            board10: body.board10,
            percentage10: body.percentage10,
            school12: body.school12,
            board12: body.board12,
            percentage12: body.percentage12,
            college: body.college,
            degree: body.degree,
            cgpa: body.cgpa,
            startYear: body.startYear,
            endYear: body.endYear,
            certificates: body.certificates,
            languages: body.languages,
        })
        console.log("info updated: ", findUser)

        if (!findUser) {
            const savedUser = await Info.create({
            id: session?.user.id,
            fullName: body.fullName,
            profession: body.profession,
            email: body.email,
            contact: body.contact,
            about: body.about,
            socials: body.socials,
            technicalSkills: body.technicalSkills,
            nontechnicalSkills: body.nontechnicalSkills,
            hobbies: body.hobbies,
            projects: body.projects,
            experience : body.experience,
            school10: body.school10,
            board10: body.board10,
            percentage10: body.percentage10,
            school12: body.school12,
            board12: body.board12,
            percentage12: body.percentage12,
            college: body.college,
            degree: body.degree,
            cgpa: body.cgpa,
            startYear: body.startYear,
            endYear: body.endYear,
            certificates: body.certificates,
            languages: body.languages,
            })
            console.log("Saved user:", savedUser)
            return NextResponse.json({message: "info saved successfully"}, { status: 200 })
        }

        return NextResponse.json({message: "info saved successfully"}, { status: 200 })

    } catch (error: unknown) {
        console.log("error in svaing user info in db ", error)
        return NextResponse.json({ error: "Failed to save user" }, { status: 500 })
    }
}
export async function GET() {
    const session = await getServerSession(authOptions)
    try {
        await ConnectDB()
        const findUser = await Info.findOne({ id: session?.user.id })
        if (findUser) {
            return NextResponse.json(findUser)
        }
        return NextResponse.json({ message: "not found" })
    }
    catch (error: unknown) {
        console.log("error in fetching user info from db ", error)
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}

export async function PATCH(req : NextRequest) {
    try {
        const val = await req.json()
        console.log(val);
        console.log(Object.entries(val))
        console.log(Object.entries(val)[0][0])
        const key = Object.entries(val)[0][0]
        const session = await getServerSession(authOptions);
        await ConnectDB();
        const findUser = await Info.findOneAndUpdate({id : session?.user.id}, {[key] : val[key]})
        console.log(findUser)
        return NextResponse.json({message : "updated"});
    } catch (error : unknown) {
        console.log("error in updating form values: ", error);
        return NextResponse.json({error : "something went wrong!"});
    }
}