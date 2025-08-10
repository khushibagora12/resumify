'use client'

import { poppins } from "../../ui/fonts"
import Image from "next/image"
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Skills({ onDataChange }: { onDataChange: (data: any) => void }) {
    const [Tskills, setTSkills] = useState<string[]>([]);
    const [Tinput, setTInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [lock, setLock] = useState(false)

    const submitHandler = () => {
        if (Tskills.length === 0 || skills.length === 0) {
            toast("empty field")
        } else {
            setLock(true)
            const Allskills = {
                technicalSkills: Tskills,
                nontechnicalSkills: skills
            }
            onDataChange(Allskills)
            // console.log("in child: ", Allskills)
            toast("Data Saved")
        }
    }

    function handleAddSkill() {
        if (input !== '') {
            setSkills([...skills, input]);
            setInput('');
        }
    }
    function handleAddTSkill() {
        if (Tinput !== '') {
            setTSkills([...Tskills, Tinput]);
            setTInput('');
        }
    }

    return (
        <>
            <div>
                <div className="m-10 ml-0 md:ml-10 flex">
                    <div >
                        <p className="flex text-3xl font-medium" ><Image src={'/skills.png'} alt="info" height={40} width={40} className="mr-2" />Skills</p>
                    </div>
                    <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
                </div>
                <div className={`${poppins.className} text-xl font-medium m-5 ml-0 md:ml-10`}>Add Skills</div>
                <form>
                    <div className="grid lg:grid-cols-2 gap-y-5">
                        <div className="md:ml-10 flex">

                            <Input placeholder="Technical skills" className="border-gray-400 border-1 focus:outline-none ring-gray-400 w-full"
                                value={Tinput}
                                onChange={(e) => {
                                    setTInput(e.target.value)
                                }}
                            />

                            <Button type="button" onClick={handleAddTSkill} className="hover:outline-3 hover:outline-white hover:ring-2 hover:ring-gray-300 bg-[#aebecf] active:bg-[#97a9bc]">Add</Button>
                        </div>
                        <div className="md:ml-10 flex">

                            <Input placeholder="Non-technical skills" className="border-gray-400 border-1 focus:outline-none ring-gray-400 w-full"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value)
                                }}
                            />

                            <Button type="button" onClick={handleAddSkill} className="hover:outline-3 hover:outline-white hover:ring-2 hover:ring-gray-300 bg-[#aebecf] active:bg-[#97a9bc]">Add</Button>
                        </div>
                    </div>
                </form>
                <hr className="m-10 text-gray-400" />
                <div className="flex sm:grid sm:grid-cols-2">
                    <div className="md:ml-10">
                        {Tskills.map((skill, index) => (
                            <div key={index} className="text-lg m-3 font-medium ">
                                <li>{skill}</li>
                            </div>
                        ))}
                    </div>
                    <div className="md:ml-10">
                        {skills.map((skill, index) => (
                            <div key={index} className="text-lg m-3 font-medium ">
                                <li>{skill}</li>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex ml-auto sm:hidden justify-center mt-5 hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>            {/* <ToastContainer/> */}
        </>
    )
}
