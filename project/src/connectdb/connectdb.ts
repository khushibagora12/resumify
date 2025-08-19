import mongoose from "mongoose";

export async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const conn = mongoose.connection;

        conn.on('connected', () => {
            console.log("db connected")
        })
        conn.on('error', () => {
            console.log("error in db connection")
            return;
        })
    }
    catch (error: unknown) {
        console.log(error);
    }
}