import Image from "next/image"
import { useEffect, useState } from "react"
import { poppins } from "@/components/ui/fonts"
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'
import Link from "next/link"
import { toast } from 'react-toastify'

interface Pro{
    name : string,
    repo : string
}
export default function Projects({ onDataChange }: { onDataChange: (data: Pro[]) => void }) {
    const [allProjects, setAllProjects] = useState([])
    const [username, setUsername] = useState({ username: '' })
    const [lock, setLock] = useState(false)
    const [projects, setProjects] = useState<Pro[]>([])
    useEffect(() => {
        console.log("pro: ", projects)
        onDataChange(projects)
    }, [projects])
    
    const setProject = () => {
         for (let i = 0; i < allProjects.length; i++) {
            console.log(allProjects[i]["name"], " ", allProjects[i]["html_url"])
            setProjects(prev => [...prev, { name: allProjects[i]["name"], repo: allProjects[i]["html_url"] }])
        }
    }
    const submitHandler = () => {
        if(allProjects.length == 0){
            toast("empty field")
        }else{
        setProject()
        setLock(true)
        toast("Data Saved")
        }
    }
    const getProjects = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/autoFetchGithub', {
            method: "POST", 
            body: JSON.stringify(username)
        })
        const projectsRes = await res.json()
        setAllProjects(projectsRes)
    }
    return (
        <>
            <div className="m-10 ml-0 md:ml-10 flex">
                <div >
                    <p className="flex text-3xl font-medium gap-x-2"><Image src={'/project.png'} alt="info" height={40} width={40} />Projects</p>
                </div>
                <div className="hidden sm:flex ml-auto hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
            </div>
            <form className="md:ml-10 gap-x-3">
                <div className={`text-md ${poppins.className} font-semibold`}>Github username</div>
                <input type="text" placeholder="Github username" className="w-[90%] p-2 bg-white rounded-xl border-1 border-gray-400 focus:outline-none"
                    value={username.username}
                    onChange={(e) => {
                        setUsername({ username: e.target.value })
                    }}
                />
                <button type="button" onClick={getProjects} className="p-2 font-semibold border-1 border-gray-400 rounded-lg mt-5 md:mt-0 md:ml-5 w-[90%] md:w-auto hover:outline-2 hover:outline-white hover:ring-2 hover:ring-gray-500 bg-[#aebecf] active:bg-[#97a9bc]">Submit</button>
            </form>
            <hr className="m-10 text-gray-400" />
            <div className="mt-10 md:ml-10">
                {
                    allProjects.map((pr, index) => (
                        <div key={index} className="flex">
                            <li>{pr["name"]}</li> --
                            <div className="font-medium underline"><Link href={pr['html_url']}>visit repo</Link></div>
                        </div>
                    ))
                }
            </div>
            <div className="flex sm:hidden ml-auto mt-5 hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
        </>
    )
}