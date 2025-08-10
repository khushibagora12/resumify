import Image from "next/image"
import { poppins } from "@/components/ui/fonts"
import React, { useState } from "react"
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'
import { toast } from "react-toastify";

interface Exp {
        position: string,
        company: string,
        startMonth: string,
        startYear: number,
        endMonth: string,
        endYear: number,
        description: string,
    }

export default function Experience({ onDataChange }: { onDataChange: (data: any) => void }) {
    const [exp, setExp] = useState<Exp>({
        position: "",
        company: "",
        startMonth: "",
        startYear: 2025,
        endMonth: "",
        endYear: 2025,
        description: "",
    })
    const [experience, setExperience] = useState<Exp[]>([])
    const [lock, setLock] = useState(false)

    const submitHandler = () => {
        if (exp.company === '' || exp.company === '' || exp.position === '' || exp.startMonth === '' ||
            exp.startYear === undefined || exp.endMonth === '' || exp.endYear === undefined || exp.description === '') {
            toast("empty field")
        } else {
            setLock(true)
            // console.log(exp)
            onDataChange(experience)
            toast("Data Saved")
        }
    }
    const addHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (exp.company === '' || exp.company === '' || exp.position === '' || exp.startMonth === '' ||
            exp.startYear === undefined || exp.endMonth === '' || exp.endYear === undefined || exp.description === '') {
            toast("empty field")
            return
        } 
        setExperience([...experience, exp])
    }
    return (
        <>
            <div className="m-10 ml-0 md:ml-10 flex">
                <div>
                    <p className="flex text-3xl font-medium" ><Image src={'/experience.png'} alt="info" height={40} width={40} className="mr-2" />Experience</p>
                </div>
                <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
            </div>
            <form className="space-y-10 md:ml-10">
                <div>
                    <div>
                        <div className={`text-md ${poppins.className} font-semibold`}>Position</div>
                        <input type="text" placeholder="Position" className="bg-white focus:outline-none p-1 rounded-lg w-[90%] border-1 border-gray-300"
                            value={exp.position}
                            onChange={(e) => {
                                setExp({ ...exp, position: e.target.value })
                            }}
                        />
                    </div>
                    <div className="mt-5">
                        <div className={`text-md ${poppins.className} font-semibold`}>Company</div>
                        <input type="text" placeholder="Company" className="bg-white focus:outline-none p-1 rounded-lg w-[90%] border-1 border-gray-300"
                            value={exp.company}
                            onChange={(e) => {
                                setExp({ ...exp, company: e.target.value })
                            }}
                        />
                    </div>
                    <div className="mt-5 grid md:grid-cols-2 gap-y-10">
                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>Start Month</div>
                            <select className="w-[80%] bg-white p-1 rounded-xl focus:outline-3 focus:outline-white focus:ring-3 focus:ring-gray-600 border-1 border-gray-300"
                                value={exp.startMonth}
                                onChange={(e) => {
                                    setExp({ ...exp, startMonth: e.target.value })
                                }}>
                                <option>Select Month</option>
                                <option value="Jan">Jan</option>
                                <option value="Feb">Feb</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="Aug">Aug</option>
                                <option value="Sept">Sept</option>
                                <option value="Oct">Oct</option>
                                <option value="Nov">Nov</option>
                                <option value="Dec">Dec</option>
                            </select>
                        </div>
                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>Start Year</div>
                            <input type="number" min="1900" max="2025" placeholder="2025" className="w-[80%] bg-white p-1 rounded-xl focus:outline-3 focus:outline-white focus:ring-3 focus:ring-gray-600 border-1 border-gray-300"
                                value={exp.startYear}
                                onChange={(e) => {
                                    setExp({ ...exp, startYear: e.target.valueAsNumber })
                                }} />
                        </div>
                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>End Month</div>
                            <select className="w-[80%] bg-white p-1 rounded-xl focus:outline-3 focus:outline-white focus:ring-3 focus:ring-gray-600 border-1 border-gray-300"
                                value={exp.endMonth}
                                onChange={(e) => {
                                    setExp({ ...exp, endMonth: e.target.value })
                                }}>
                                <option>Select Month</option>
                                <option value="Jan">Jan</option>
                                <option value="Feb">Feb</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="Aug">Aug</option>
                                <option value="Sept">Sept</option>
                                <option value="Oct">Oct</option>
                                <option value="Nov">Nov</option>
                                <option value="Dec">Dec</option>

                            </select>
                        </div>
                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>End Year</div>
                            <input type="number" min="1900" max="2025" placeholder="2025" className="w-[80%] bg-white p-1 rounded-xl focus:outline-3 focus:outline-white focus:ring-3 focus:ring-gray-600 border-1 border-gray-300"
                                value={exp.endYear}
                                onChange={(e) => {
                                    setExp({ ...exp, endYear: e.target.valueAsNumber })
                                }} />
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className={`text-md ${poppins.className} font-semibold`}>Description</div>
                        <textarea className="bg-white p-2 w-[90%] h-20 rounded-xl focus:outline-none border-1 border-gray-300" placeholder="Description"
                            value={exp.description}
                            onChange={(e) => {
                                setExp({ ...exp, description: e.target.value })
                            }}
                        />
                    </div>
                    <button onClick={addHandler} className="mt-2 p-2 w-[90%] rounded-xl bg-[#aebecf]">Add</button>
                </div>
            </form>
            <div className="m-10">
                {
                    experience.map((ex, index) => (
                        <div key={index}>
                            <div className="font-bold">{ex.position}</div>
                            <div>{ex.company} | {ex.startMonth}/{ex.startYear}-{ex.endMonth}/{ex.endYear}</div>
                        </div>
                    ))
                }
            </div>
            <div className="flex ml-auto sm:hidden mt-5 justify-center hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>

        </>
    )
}