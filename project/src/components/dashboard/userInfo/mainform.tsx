'use client'
import Certificates from "@/components/dashboard/userInfo/certificates";
import Education from "@/components/dashboard/userInfo/education";
import UserInfo from "@/components/dashboard/userInfo/info";
import Skills from "@/components/dashboard/userInfo/skills";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Socials from "./socials";
import Projects from "./projects";
import Experience from "./experience";
import Hobbies from "./hobbies";
import Languages from "./language";
import Image from "next/image";
import { poppins } from "@/components/ui/fonts";

interface Exp {
        position: string,
        company: string,
        startMonthExp: string,
        startYearExp: number,
        endMonthExp: string,
        endYearExp: number,
        description: string,
    }

export default function AllData() {
    const [info, setInfo] = useState<{
        fullName: string,
        profession: string,
        email: string,
        contact: string,
        about: string
    }>({fullName: "",
        profession: "",
        email: "",
        contact: "",
        about: ""});
    const [skills, setSkills] = useState<{
        technicalSkills: [string],
        nontechnicalSkills: [string]
    }>({
        technicalSkills: [''],
        nontechnicalSkills: ['']
    });
    const [education, setEducation] = useState<{
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
    }>({
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
        endYear: "",});
    const [certificates, setCertificates] = useState({});
    const [hobbies, setHobbies] = useState({});
    const [experience, setExperience] = useState<Exp[]>([]);
    const [languages, setLanguages] = useState({});
    const [socials, setSocials] = useState({});
    const [projects, setProjects] = useState({});
    const [id, setId] = useState("");
    const [guide, setGuide] = useState(false);
    console.log(experience)
    useEffect(() => {
        const getUserInfo = async () => {
            const res = await fetch('/api/authentication/signup', {
                method: "GET"
            })
            const response = await res.json()
            setId(response.id)
        }
        getUserInfo()
    }, [])

    const allData = {
        id: id,
        fullName: info.fullName,
        profession: info.profession,
        email: info.email,
        contact: info.contact,
        about: info.about,
        socials: socials,
        technicalSkills: skills.technicalSkills,
        nontechnicalSkills: skills.nontechnicalSkills,
        hobbies: hobbies,
        projects: projects,
        experience: experience,
        school10: education.school10,
        board10: education.board10,
        percentage10: education.percentage10,
        school12: education.school12,
        board12: education.board12,
        percentage12: education.percentage12,
        college: education.college,
        degree: education.degree,
        cgpa: education.cgpa,
        startYear: education.startYear,
        endYear: education.endYear,
        certificates: certificates,
        languages: languages,
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(info).length === 0 || Object.keys(skills).length === 0 || Object.keys(education).length === 0 || Object.keys(experience).length === 0 ||
            Object.keys(hobbies).length === 0 || Object.keys(languages).length === 0 || Object.keys(certificates).length === 0 || Object.keys(socials).length === 0 || Object.keys(projects).length === 0) {
            toast("empty fields")
        }
        else {
            console.log("in submithandler")
            try {
                const res = await fetch('api/userInfo', {
                    method: "POST",
                    headers: {
                        "content-type": "application/ json"
                    },
                    body: JSON.stringify(allData)
                })
                const result = await res.json()
                toast("info saved: ", result.message)
            }
            catch (error: unknown) {
                console.log("error in posting data", error)
            }
        }
    }
    return (
        <>
            <div className="h-screen w-[90%] flex justify-center items-center bg-[#E6F0F4]">

                <div className=" rounded-3xl shadow-[0_0_20px_10px_rgba(152,152,152,0.3)] h-[90%] w-[90%] p-10 overflow-y-scroll">
                    <section className="min-h-screen">
                        <UserInfo onDataChange={(data) => { setInfo(data) }} />
                    </section>
                    <section className="min-h-screen">
                        <Socials onDataChange={(data) => { setSocials(data) }} />
                    </section>
                    <section className="min-h-screen" >
                        <Skills onDataChange={(data) => { setSkills(data) }} />
                    </section>
                    <section className="min-h-screen" >
                        <Hobbies onDataChange={(data) => { setHobbies(data) }} />
                    </section>
                    <section className="min-h-screen">
                        <Projects onDataChange={(data) => { setProjects(data) }} />
                    </section>
                    <section className="min-h-screen">
                        <Experience onDataChange={(data) => { setExperience(data) }} />
                    </section>
                    <section className="min-h-screen">
                        <Education onDataChange={(data) => { setEducation(data) }} />
                    </section>
                    <section className="min-h-screen">
                        <Certificates onDataChange={(data) => { setCertificates(data) }} />
                    </section>
                    <section className="min-h-screen">
                        <Languages onDataChange={(data) => { setLanguages(data) }} />
                    </section>
                    <Button className="w-full bg-[#aebecf] text-[#123458] font-bold p-3 rounded-md hover:outline-1 hover:outline-white hover:shadow-gray-400 hover:shadow-md active:bg-[#97a9bc]" type='submit' onClick={submitHandler}>Submit</Button>
                </div>
                <div className="fixed top-0 right-0 m-3" >
                    <Image src={'/guide.png'} height={30} width={50} alt="guide" className="fixed top-0 right-0 m-3" onClick={() => {
                        setGuide(!guide)
                    }} />
                    <div className={`${guide ? '' : 'hidden'} h-auto w-200 rounded-2xl border-2 border-gray-300 bg-white p-5`}>
                        <h1 className={`${poppins.className} font-medium text-2xl m-2`}>How to use Resumify</h1>
                        <ol className="list-decimal m-10">
                            <li className="font-medium">Fill Out the Resume Form
                                <ul className="list-disc font-normal text-gray-700">
                                    <li>On the Dashboard, you'll find a form with 9 sections: <br />Basic Info, Socials, Skills, Hobbies, Projects, Experience, Education, Certificates, Languages</li>
                                    <li>Enter your details in each section.</li>
                                    <li>After filling a section, make sure to lock it to save the information. <br />⚠️ If you don't lock a section, your data won't be saved. </li>
                                    <li>After completing all sections, click the Submit button at the bottom of the form.</li>
                                </ul>
                            </li>
                            <hr className="m-3 text-gray-400"/>
                            <li className="font-medium">View & Edit Your Saved Information
                                <ul className="list-disc font-normal text-gray-700">
                                    <li>Use the My Information tab in the sidebar to view your saved details.</li>
                                    <li>You can also edit your information from this section. <br />✏️ Note: When editing, your previous input will be replaced. To keep old data along with new, include all items again. </li>
                                    
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}