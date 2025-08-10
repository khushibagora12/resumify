'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
export default function MyResumePage(){
    const [urls, setUrls] = useState([]);

    useEffect(() => {
            console.log("in useEffect")
            const fetchFunc = async () => {
                const res = await fetch('/api/myResume', {
                    method: 'GET',
                })
                const userData = await res.json();
                console.log("in fetch", userData);
                setUrls(userData);
            }
            fetchFunc();
        }, [])
        
        console.log("all urls" , urls);
    return(
        <>
        <h1>My Resumes</h1>
        <div>
        {
            urls.map((myurl : string, idx : number) => (
                <li key={idx}><Link href={myurl.resumePdf}>your resume {idx + 1}</Link></li>
            ))
        }
        </div>
        </>
    )
}