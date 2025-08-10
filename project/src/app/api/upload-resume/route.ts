// import cloudinary from "@/utils/cloudinary";
// import { NextResponse } from "next/server";

// cloudinary.v2.config({
//     cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//     api_key : process.env.CLOUDINARY_API_KEY,
//     api_secret : process.env.CLOUDINARY_API_SECRET
// });

// export async function POST(req : Request) {
//     let url = "";
//     try{
//        const file = req.body;
//        const upload = await cloudinary.Uploader.upload({
//         resource_type: "pdf",
//         chunk_size: 6000000,
//     });
//     url = upload.url;
//     }
//     catch(e : any){
//         NextResponse.json({error : e.error || "something went wrong"}, {status : 500});
//     }
//     console.log(url);
//     NextResponse.json({data : url});
// }