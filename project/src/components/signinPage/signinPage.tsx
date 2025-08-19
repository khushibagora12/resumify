'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { signIn } from 'next-auth/react'
import { plexSerif, limelight } from "../ui/fonts";
import Link from "next/link";

export default function SigninPage() {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const router = useRouter();
    const signinHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            });

            if (!res?.ok) {
                console.log("sign in failed")
                toast("invalid credentials")
                return;
            }
            toast("Signed In successfully");
            router.replace('/dashboard');

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
                <div className="justify-center items-center bg-gradient-to-br from-[#bedeeb] to-[#e7e0d0] sm:h-[440px] sm:w-[470px] rounded-2xl">
                    <div className="flex justify-center items-center">
                        <div className="m-5 p-5 sm:h-[400px] sm:w-[450px] align-middle bg-[#aebecf] rounded-lg">
                            <div className={`flex justify-center items-center text-center text-lg font-bold m-auto `}>Welcome Back to Your Digital Identity</div>
                            <div className={` flex justify-center items-center ${plexSerif.className} text-[#545454] text-center text-xs m-2`}>Create, customize, and showcase your resume & portfolio effortlessly.</div>
                            <div className="flex justify-center items-center m-5 mt-10">
                                <form className="grid grid-col gap-5 w-70">
                                    <input type="email" placeholder="Email" className="bg-white rounded-md p-2 ring-1 ring-[#D4C9BE] shadow-md shadow-gray-500 focus:outline-none"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                    <input type="password" placeholder="Password" className="bg-[#F1EFEC] rounded-md p-2 ring-1 ring-[#D4C9BE] shadow-md shadow-gray-500 focus:outline-none"
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                    />
                                    <div className="flex justify-center m-5">
                                        <button type="submit" className=" bg-[#545e6c] w-30 text-white font-semibold p-3 rounded-sm hover:ring-3 hover:ring-gray-600 hover:outline-3 hover:outline-white active:bg-[#4d5867]" onClick={signinHandler}>SignIn</button>
                                    </div>
                                </form>
                            </div>
                            <div className={`flex justify-center ${plexSerif.className} text-[#545454] text-sm`}>{"Don't have an account?"} <Link href={"/signup"} className={`font-bold`} >SignUp</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}