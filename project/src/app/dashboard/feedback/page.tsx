'use client'
import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { poppins } from "@/components/ui/fonts";
import { toast, ToastContainer } from 'react-toastify'

export default function Feedback() {
    const [idx, setIdx] = useState(0);
    const [formData, setFormData] = useState({
        rating: 0,
        feedback: ''
    });
    function rating(i: number) {
        setIdx(i);
        setFormData(prev => ({ ...prev, rating: i }))
        console.log(i);
    }
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            console.log(formData);
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const resData = await res.json();
            console.log("Success:", resData);
            toast(resData.message);
        }
        catch(err : any) {
            console.log("errorr!!");
            toast.error("Failed to send feedback : ", err.message);
        }
    }
    return (
        <>
            <div className="m-10">
                <div className="flex">
                    <Image src={"/feedback.png"} alt="feedback" height={40} width={40} />
                    <h1 className={`text-[#123458] ${poppins.className} text-3xl font-semibold ml-3`}>Send Feedback</h1>
                </div>
                <hr className="text-gray-400 m-5" />
                <p className={`text-[#123458] ${poppins.className} text-xl font-semibold`}>Your feedback is anonymous</p>
                <div className="flex m-5 ml-0 font-medium">
                    <Star className="" size={30} onClick={() => { rating(1) }} color={idx >= 1 ? "orange" : "gray"} fill={idx >= 1 ? "orange" : "gray"} />
                    <Star className="" size={30} onClick={() => { rating(2) }} color={idx >= 2 ? "orange" : "gray"} fill={idx >= 2 ? "orange" : "gray"} />
                    <Star className="" size={30} onClick={() => { rating(3) }} color={idx >= 3 ? "orange" : "gray"} fill={idx >= 3 ? "orange" : "gray"} />
                    <Star className="" size={30} onClick={() => { rating(4) }} color={idx >= 4 ? "orange" : "gray"} fill={idx >= 4 ? "orange" : "gray"} />
                    <Star className="" size={30} onClick={() => { rating(5) }} color={idx >= 5 ? "orange" : "gray"} fill={idx >= 5 ? "orange" : "gray"} />
                </div>
                <div className="h-full">
                    <h3 className={`text-[#123458] ${poppins.className} text-md font-semibold m-3 ml-0`}>Message: </h3>
                    <textarea name="feedback" placeholder="Write your feedback" className="border-1 border-gray-400 w-full h-40 focus:border-none rounded-2xl p-3" onChange={(e) => {
                        setFormData(prev => ({ ...prev, feedback: e.target.value }))
                    }} />
                </div>
                <button type="submit" onClick={onSubmit} className="w-full bg-[#aebecf] m-3 ml-0 p-3 rounded-2xl text-[#123458] font-bold hover:outline-4 hover:outline-white hover:shadow-lg active:bg-[#8d9cad]">Send Feedback</button>
                <ToastContainer />
            </div>
        </>
    );
}