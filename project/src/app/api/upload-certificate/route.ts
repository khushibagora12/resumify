// import { NextResponse } from 'next/server';
// import cloudinary from '../../../utils/cloudinary';

// export async function POST(request:any) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file');
    
//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const fileBuffer = await file.arrayBuffer();
//     const mime = file.type;
//     const encoding = 'base64';
//     const base64Data = Buffer.from(fileBuffer).toString('base64');
//     const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

//     const result = await cloudinary.uploader.upload(fileUri, {
//       resource_type: 'auto'
//     });

//     return NextResponse.json({ url: result.secure_url });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };