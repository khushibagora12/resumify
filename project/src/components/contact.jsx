import { poppins } from "./ui/fonts";
import Image from "next/image";

export default function ContactUs() {
    return (
        <>
            <div className="w-full p-10 justify-center">
                <h1 className={`text-[#123458] ${poppins.className} font-bold text-4xl w-full flex justify-center`}>Contact Us</h1>
                <h1 className={`text-[#123458] ${poppins.className}  text-xl w-full flex justify-center align-middle`}>Feel free to reach out here</h1>

            </div>
            <div className="flex justify-center items-center align-middle">
                <div className=" p-10 h-[200px] w-[25%] bg-white rounded-4xl border-2 border-gray-300">
                    <div className="flex">
                    <div><Image src={"/email.png"} alt="email" height={40} width={60} /></div>
                    <p className="m-1 text-2xl font-bold text-[#123458]">dummy@gmail.com</p>
                    </div>
                    <div className="text-xl text-gray-500">
                        We typically respond within 24 hours.
                    </div>
                </div>
                
            </div>
        </>
    );
}