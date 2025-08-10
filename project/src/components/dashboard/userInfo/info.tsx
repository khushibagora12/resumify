'use client'

import { poppins } from "../../ui/fonts"
import Image from "next/image"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'

export default function UserInfo({ onDataChange }: { onDataChange: (data: any) => void }) {
    // console.log("in child", onDataChange)
    const [info, setInfo] = useState<{
        fullName: string,
        profession: string,
        email: string,
        contact: string,
        about: string
    }>({
        fullName: "",
        profession: "",
        email: "",
        contact: "",
        about: ""
    })
    const [username, setUsername] = useState("")
    const [lock, setLock] = useState(false)
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await fetch('/api/authentication/signup', {
                    method: "GET"
                })
                const response = await res.json()
                // console.log("usernname=" ,response.username)
                setUsername(response.username)
            }
            catch (error: unknown) {
                console.log(error);
            }
        }
        getUserInfo()
    }, [])

    const submitHandler = () => {
        if(info.fullName === '' || info.profession === '' || info.contact === '' || info.contact === '' || info.about === ''){
            toast("empty field")
        }else{
        setLock(true)
        onDataChange(info)
        toast("Data Saved")
        }
    }
    // console.log("username: ", username)
    const date = new Date()
    const currDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    return (
        <>
            <div className="md:pl-10">
                <h1 className={`${poppins.className} text-3xl`}>Welcome {username}</h1>
                <h2 className={`${poppins.className} text-lg text-[#ADA7A7]`}>{currDate}</h2>
            </div>

            <div className="m-10 ml-0 md:ml-10 flex">
                <div>
                    <p className="flex text-3xl font-medium"><Image src={'/file.png'} alt="info" height={40} width={40} />Info</p>
                    <p className="text-2xl font-medium">Write once, use anywhere</p>
                </div>
                <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg sm:h-[50%]" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
            </div>
            <form className="space-y-10 md:ml-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-0">
                    <div>
                        <div className={`text-md ${poppins.className} font-semibold`}>Full Name</div>
                        <input placeholder="Enter your name" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                            value={info.fullName}
                            onChange={(e) => { setInfo({ ...info, fullName: e.target.value }) }}
                        />
                    </div>
                    <div>
                        <div className={`text-md ${poppins.className} font-semibold`}>Profession</div>
                        <input placeholder="Enter your profession" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                            value={info.profession}
                            onChange={(e) => { setInfo({ ...info, profession: e.target.value }) }}
                        />
                    </div>
                    <div>
                        <div className={`text-md ${poppins.className} font-semibold `}>Email</div>
                        <input placeholder="Enter your email" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                            value={info.email}
                            onChange={(e) => { setInfo({ ...info, email: e.target.value }) }}
                        />
                    </div>
                    <div>
                        <div className={`text-md ${poppins.className} font-semibold`}>Contact no.</div>
                        <input placeholder="Enter your contact number" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                            value={info.contact}
                            onChange={(e) => { setInfo({ ...info, contact: e.target.value }) }}
                        />
                    </div>
                </div>
                <div>
                    <div className={`text-md ${poppins.className} font-semibold `}>About</div>
                    <textarea placeholder="A more detailed summary of yourself and what you do." className="h-30 w-[100%] bg-white p-5 rounded-xl outline-none shadow-gray-300 shadow-sm"
                        value={info.about} onChange={(e) => { setInfo({ ...info, about: e.target.value }) }} />
                </div>
            </form>
            <div className="flex ml-auto sm:hidden justify-center mt-5 hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg sm:h-[50%]" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
            {/* <ToastContainer/> */}
        </>
    )
}


