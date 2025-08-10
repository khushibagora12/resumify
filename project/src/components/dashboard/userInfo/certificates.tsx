'use client'

import { poppins } from "../../ui/fonts"
import Image from "next/image"
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'
interface Cert {
    certName : string,
    file : string
}
export default function Certificates({ onDataChange }: { onDataChange: (data: any) => void }) {
    const [pdfArr, setPdfArr] = useState<File[]>([]);
    const [pdf, setPdf] = useState<File | null>(null);
    const [certificates, setCertificates] = useState<object[]>([])
    const [certArr, setCertArr] = useState<string[]>([]);
    const [certName, setCertName] = useState('');
    const [lock, setLock] = useState(false);
    const [fullcertificates, setfullcertificates] = useState<Cert[]>([]);
    const submitHandler = async () => {
        if(certArr.length === 0){
            toast("empty field")
        }else{
        setLock(true)
        // useEffect(() => {
        console.log(fullcertificates)
        onDataChange(fullcertificates)
        // }, [certificates])

        toast("Data Saved")
        }
    }

    async function handleAddFile() {
        if (pdf !== null && certName !== '') {
            setPdfArr([...pdfArr, pdf]);
            setCertArr([...certArr, certName])
            setCertificates([...certificates, { certName: certName, file: pdf }])
            const formdata = new FormData();
            formdata.append("file", pdf);
            formdata.append("upload_preset", "certificates")
            const res = await fetch(`https://api.cloudinary.com/v1_1/dmkwymeim/upload`, {
                method: 'POST',
                body: formdata
            })
            const result = await res.json();
            setfullcertificates([...fullcertificates, { certName: certName, file: result.secure_url }])
            // console.log(fullcertificates)
            console.log(result)
            setPdf(null);
            setCertName('');
        }
    }
    return (
        <>
            <div>
                <div className="m-10 ml-0 md:ml-10 sm:flex">
                    <div >
                        <p className="flex text-3xl font-medium" ><Image src={'/certificate.png'} alt="info" height={40} width={40} className="mr-2" />Certificates</p>
                    </div>
                    <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
                </div>
                <form>
                    <div className="w-full md:flex">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:ml-10 w-full">

                            <div>
                                <label className={`text-md ${poppins.className} font-semibold`}>Certificate Name</label>
                                <input placeholder="Enter certificate name" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                    id="certInput" value={certName} onChange={(e) => {
                                        setCertName(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label className={`text-md ${poppins.className} font-semibold`}>Upload pdf</label>
                                <input type="file" accept="application/pdf" className="bg-white focus:outline-none p-1 rounded-lg w-[90%]"
                                    id="pdfs" onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        setPdf(file || null)
                                    }}
                                />
                            </div>
                        </div>
                        <Button type="button" onClick={handleAddFile} className="md:justify-end mt-5 w-[90%] md:w-auto hover:outline-white hover:outline-2 hover:ring-1 hover:ring-gray-400 bg-[#aebecf] active:bg-[#97a9bc]">Add</Button>
                    </div>
                </form>
            </div>
            <hr className="text-gray-400 m-10" />
            <div className="md:ml-10">
                {certArr.map((certs, index) => (
                    <div key={index} className="flex">
                        <div className="text-lg m-3 font-medium ">
                            <li>{certs}</li>
                        </div>
                        {
                            pdfArr[index] && (
                                <div className="text-lg m-3 font-medium flex">
                                    <Link
                                        href={URL.createObjectURL(pdfArr[index])}
                                        target="_blank"
                                        className="flex"
                                    >
                                        <Image src={"/link.png"} height={30} width={30} alt="link" className="mr-1" />
                                        View pdf
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
            <div className="flex ml-auto sm:hidden mt-5 justify-center hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>

            {/* <ToastContainer/> */}
        </>
    )
}