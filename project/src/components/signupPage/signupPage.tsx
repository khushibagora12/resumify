'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { limelight, poppins, plexSerif } from "../ui/fonts";
import Link from "next/link";

export default function SignupPage() {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const router = useRouter();
    const signupHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (data.username === '' || data.email === '' || data.password === '') {
            toast("All feilds are required");
        }
        try {
            const res = await fetch('/api/authentication/signup', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json();

            toast(response.message);
            if (response.message === 'user signed up successfully') {
                setData({ ...data, username: '', email: '', password: '' })
                router.push('/signin');
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="m-5">
                <div className="flex gap-4">
                    <div className={`text-4xl p-3 ${limelight.className} font-bold text-[#1C3D5A]`}>
                        <span className="text-5xl underline">R</span>esumify
                    </div>
                </div>
            </div >
            <div className="flex justify-center items-center m-2">
                <div className="justify-center items-center bg-gradient-to-br from-[#bedeeb] to-[#e7e0d0] sm:h-[490px] sm:w-[470px] rounded-2xl">
                    <div className="flex justify-center items-center">
                        <div className="m-5 p-5 sm:h-[450px] sm:w-[450px] align-middle bg-[#aebecf] rounded-lg">
                            <div className={`flex justify-center items-center text-center ${poppins.className} text-xl font-bold m-auto `}>Build Your <br /> Professional <br /> Presence</div>
                            <div className="flex justify-center items-center text-center text-sm ">Great stunning resumes <br /> & portfolios in minutes</div>
                            <div className="flex justify-center items-center m-5">
                                <form className="grid grid-col gap-5 w-70">
                                    <input type="text" className="bg-white rounded-md p-2 ring-1 ring-[#D4C9BE] shadow-md shadow-gray-500  focus:outline-none" placeholder="Username"
                                        value={data.username}
                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                    />
                                    <input type="text" className="bg-white rounded-md p-2 ring-1 ring-[#D4C9BE] shadow-md shadow-gray-500  focus:outline-none" placeholder="Email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                    <input type="password" className="bg-white rounded-md p-2 ring-1 ring-[#D4C9BE] shadow-md shadow-gray-500  focus:outline-none" placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                    />
                                    <div className="flex justify-center">
                                        <button type="submit" className=" bg-[#545e6c] w-30 text-white font-semibold p-3 rounded-sm hover:ring-3 hover:ring-gray-600 hover:outline-3 hover:outline-white active:bg-[#4d5867]" onClick={signupHandler}>SignUp</button>
                                    </div>
                                </form>
                            </div>
                            <div className={`flex justify-center ${plexSerif.className} text-[#545454] text-sm`}>Already have an account? <Link href={"/login"} className={`${plexSerif.className} text-[#545454] text-sm font-bold`} >SignIn</Link></div>
                        </div>
                    </div >
                </div>
            </div>
            <ToastContainer />
        </>
    )
}