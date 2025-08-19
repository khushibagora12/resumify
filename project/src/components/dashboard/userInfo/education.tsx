'use client'

import Image from "next/image"
import { poppins } from "../../ui/fonts"
import { useState } from "react"
import { toast } from "react-toastify";
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'

interface Edu {
    school10: string,
    board10: string,
    percentage10: string,
    school12: string,
    board12: string,
    percentage12: string,
    college: string,
    degree: string,
    cgpa: string,
    startYear: string,
    endYear: string,
}
export default function Education({ onDataChange }: { onDataChange: (data: Edu) => void }) {
    const [education, setEducation] = useState({
        school10: "",
        board10: "",
        percentage10: "",
        school12: "",
        board12: "",
        percentage12: "",
        college: "",
        degree: "",
        cgpa: "",
        startYear: "",
        endYear: "",
    })
    const [lock, setLock] = useState(false)
    const submitHandler = () => {
        if (
            education.school10 === '' || education.board10 === '' || education.percentage10 === '' || education.school12 === '' ||
            education.board12 === '' || education.percentage12 === '' || education.college === '' || education.degree === '' ||
            education.cgpa === '' || education.startYear === '' || education.endYear === ''
        ) {
            toast('empty field')
        } else {
            setLock(true)
            onDataChange(education)
            // console.log("in child: ", education)
            toast("Data Saved")
        }
    }
    return (
        <>
            <div>
                <div className="m-10 ml-0 md:ml-10 flex">
                    <div >
                        <p className="flex text-3xl font-medium" ><Image src={'/education.png'} alt="info" height={40} width={40} className="mr-2" />Education</p>
                    </div>
                    <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
                </div>
                <form className="space-y-10 md:ml-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-0">
                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>School</div>
                            <input placeholder="School name(10th)" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.school10}
                                onChange={(e) => { setEducation({ ...education, school10: e.target.value }) }}
                            />
                        </div>


                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>Board</div>
                            <input placeholder="Enter board(10th)" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.board10}
                                onChange={(e) => { setEducation({ ...education, board10: e.target.value }) }}
                            />
                        </div>


                        <div>
                            <div className={`text-md ${poppins.className} font-semibold `}>Percentage(out of 100)</div>
                            <input placeholder="10th %age" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.percentage10}
                                onChange={(e) => { setEducation({ ...education, percentage10: e.target.value }) }}
                            />
                        </div>


                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>School</div>
                            <input placeholder="School name(12th)" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.school12}
                                onChange={(e) => { setEducation({ ...education, school12: e.target.value }) }}
                            />
                        </div>


                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>Board</div>
                            <input placeholder="Enter board(12th)" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.board12}
                                onChange={(e) => { setEducation({ ...education, board12: e.target.value }) }}
                            />
                        </div>

                        <div>
                            <div className={`text-md ${poppins.className} font-semibold `}>Percentage(out of 100)</div>
                            <input placeholder="12th %age" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.percentage12}
                                onChange={(e) => { setEducation({ ...education, percentage12: e.target.value }) }}
                            />
                        </div>

                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>College</div>
                            <input placeholder="College name" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.college}
                                onChange={(e) => { setEducation({ ...education, college: e.target.value }) }}
                            />
                        </div>

                        <div>
                            <label className={`text-md ${poppins.className} font-semibold`}>Degree</label>
                            <input placeholder="Degree name" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.degree}
                                onChange={(e) => { setEducation({ ...education, degree: e.target.value }) }} />
                        </div>

                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>CGPA(out of 10)</div>
                            <input placeholder="cgpa" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.cgpa}
                                onChange={(e) => { setEducation({ ...education, cgpa: e.target.value }) }}
                            />
                        </div>

                    </div>


                    <div className="grid grid-cols-1 gap-y-5">
                        <div>
                            <div className={`text-md ${poppins.className} font-semibold`}>Start year</div>
                            <input placeholder="Startig year of your degree" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.startYear}
                                onChange={(e) => { setEducation({ ...education, startYear: e.target.value }) }}
                            />
                        </div>

                        <div>
                            <div className={`text-md ${poppins.className} font-semibold `}>End year</div>
                            <input placeholder="Ending year of your degree" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                value={education.endYear}
                                onChange={(e) => { setEducation({ ...education, endYear: e.target.value }) }}
                            />
                        </div>

                    </div>
                    {/* <Button type="submit">Continue</Button> */}
                </form>
            </div >
            <div className="flex ml-auto sm:hidden mt-5 justify-center hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>

            {/* <ToastContainer/> */}
        </>
    )
}