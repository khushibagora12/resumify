'use client'
import { ArrowDownToLine, ChevronLeft, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ResumeTemplate1 from './template1';
import { useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { toast, ToastContainer } from 'react-toastify';

interface AllData {
    fullName: string,
    profession: string,
    email: string,
    contact: string,
    about: string,
    socials: [{ platform: string, link: string }],
    technicalSkills: [string],
    nontechnicalSkills: [string],
    hobbies: [string],
    projects: [{ name: string, repo: string }],
    experience: [
        {
            position: string,
            company: string,
            startMonthExp: string,
            startYearExp: string,
            endMonthExp: string,
            endYearExp: string,
            description: string,
        }
    ],
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
    certificates: [{ certName: string, file: string }],
    languages: [string]
}

export default function PreviewPage() {

    const [allData, setAllData] = useState< {
    fullName: string,
    profession: string,
    email: string,
    contact: string,
    about: string,
    socials: [{ platform: string, link: string }],
    technicalSkills: [string],
    nontechnicalSkills: [string],
    hobbies: [string],
    projects: [{ name: string, repo: string }],
    experience: [
        {
            position: string,
            company: string,
            startMonthExp: string,
            startYearExp: string,
            endMonthExp: string,
            endYearExp: string,
            description: string,
        }
    ],
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
    certificates: [{ certName: string, file: string }],
    languages: [string]
}>( {
    fullName: "",
    profession: "",
    email: "",
    contact: "",
    about: "",
    socials: [{ platform: "", link: "" }],
    technicalSkills: [""],
    nontechnicalSkills: [""],
    hobbies: [""],
    projects: [{ name: "", repo: "" }],
    experience: [
        {
            position: "",
            company: "",
            startMonthExp: "",
            startYearExp: "",
            endMonthExp: "",
            endYearExp: "",
            description: "",
        }
    ],
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
    certificates: [{ certName: "", file: "" }],
    languages: [""]
});

    useEffect(() => {
        console.log("useeffect");
        const fetchFunc = async () => {
            console.log("here is the data");
            const res = await fetch('/api/userInfo', {
                method: 'GET',
            })
            const userData = await res.json();
            console.log("in fetch", userData);
            setAllData(userData);
        }
        fetchFunc();
    }, [])
    console.log("all data:", allData);
    const router = useRouter();
    const handleClick = () => {
        router.push('/dashboard/resume');
    }

    const contentRef = useRef<HTMLDivElement>(null);
    const reactPrint = useReactToPrint({ contentRef });

    const saveRef = useRef<HTMLDivElement>(null);

    const pdfDownload = async () => {
        const element = saveRef.current;

        if (!element) {
            console.log("not found")
            return;
        }
        try {

            const dataUrl = await toPng(element, { pixelRatio: 1.5 })

            const doc = new jsPDF('p', 'pt', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const myUrl = doc.addImage(dataUrl, 'PNG', 0, 0, pageWidth, pageHeight);
            console.log("myurl" + myUrl)

            const blob = doc.output('blob');

            //saving pdf in cloudinary
            const formdata = new FormData();
            formdata.append("file", blob);
            formdata.append("upload_preset", "resume");
            for (const [key, value] of formdata.entries()) {
                console.log(`${key}:`, value);
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/dmkwymeim/upload', {
                method: 'POST',
                body: formdata
            });
            const result = await res.json();
            console.log("result" + result);

            //passing these urls to mongodb
            const pdfurl = result.secure_url;
            console.log(pdfurl);

            await fetch('/api/myResume', {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    resumePdf: pdfurl
                })
            })
            toast("resume saved!");

        }
        catch (e: unknown) {
            console.log("error in saving resume: ", e)
        }
    }

    return (
        <>
            <div className="grid lg:flex">
                <div ref={saveRef}>
                    <div ref={contentRef} >
                        <ResumeTemplate1 data={allData!} />
                    </div>
                </div>
                <div className="bg-[#aebecf] w-[300px] h-[200px] m-10 rounded-2xl">
                    <h1 className="text-2xl p-5 font-semibold">Resume Preview</h1>
                    <hr className="text-gray-400 m-5 mt-0" />
                    <div className="flex flex-col items-start">
                        <Button className="border-0 shadow-none text-lg font-normal hover:text-gray-600" onClick={reactPrint}><ArrowDownToLine /> Download</Button>
                        <Button className="border-0 shadow-none text-lg font-normal hover:text-gray-600" onClick={pdfDownload}><Save /> Save</Button>
                        <Button className="border-0 shadow-none text-lg font-normal hover:text-gray-600" onClick={handleClick}><ChevronLeft />Go Back</Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}