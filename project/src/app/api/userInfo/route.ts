import { z } from "zod";
import connectDB from "./mongodb";
import Info from "./db"
import { NextResponse } from "next/server";

const certificateSchema = z.object({
    certName : z.string().min(3).max(20),
    file : z.any()
});

const infoStructure = z.object({
    fullName: z.string().max(50).min(4),
    heroTitle: z.string().max(50).min(4),
    profession: z.string().max(20).min(4),
    bio: z.string().min(10).max(100),
    about : z.string().min(100).max(500),
    technicalSkills: z.string().min(3).max(50).array(),
    nonTechnicalSkills: z.string().min(3).max(50).array(),
    school10: z.string().min(3).max(100),
    board10: z.string().min(3).max(10),
    percentage10: z.number().min(0).max(100),
    school12: z.string().min(3).max(100),
    board12: z.string().min(3).max(10),
    percentage12: z.number().min(0).max(100),
    college: z.string().min(3).max(100),
    degree: z.string().min(3).max(10),
    cgpa: z.number().min(0).max(10),
    startYear: z.number(),
    endYear: z.number(),
    certificates : z.array(certificateSchema)
});


export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const parsed = infoStructure.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ erroe: parsed.error }, { status: 400 });
        }

        const { fullName, heroTitle, profession, bio, about, technicalSkills, nonTechnicalSkills,
            school10, board10, percentage10, school12, board12, percentage12, college, degree,
            cgpa, startYear, endYear, certificates } = parsed.data;

        const info = new Info({
           fullName,
           heroTitle,
           profession,
           bio,
           about,
           technicalSkills,
           nonTechnicalSkills,
           school10,
           board10,
           percentage10,
           school12,
           board12,
           percentage12,
           college,
           degree,
           cgpa,
           startYear,
           endYear,
           certificates
    });
    console.log("Mongoose model instance:", info);
    console.log(typeof startYear, endYear);
    await info.save();
    console.log("info saved")
    return NextResponse.json({message : "user info saved successfully"}, {status : 201});

    }
    catch(e : any){
        return NextResponse.json({error : e.message || "something went wrong"}, {status : 500});
    }
}
