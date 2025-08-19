import Image from "next/image"
import { useState } from "react"
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'
import Link from "next/link"
import {toast} from 'react-toastify'
interface Soc{
    platform : string,
    link : string
}
export default function Socials({onDataChange}: {onDataChange: (data: Soc[]) => void}) {

    const [lock, setLock] = useState(false)
    const [platform, setPlatform] = useState('')
    const [platformArr, setPlatformArr] = useState<string[]>([])
    const [link, setLink] = useState('')
    const [linkArr, setLinkArr] = useState<string[]>([])
    const [socials, setSocials]  = useState<Soc[]>([])

    const addSocials = () => {
        if(platform !== '' && link !== ''){
            setPlatformArr([...platformArr, platform])
            setLinkArr([...linkArr, link])
            // console.log(platform, " ", link)
            setSocials([...socials, {platform: platform, link: link}])
            // console.log(socials)
            setPlatform('')
            setLink('')
        }
    }
    const submitHandler = () => {
        if(platformArr.length === 0 || linkArr.length === 0){
            toast("empty field")
        }else{
        setLock(true)
        // useEffect(() => {
            onDataChange(socials)
        // }, [socials])
        toast("Data Saved")
        }
    }
    return (
        <>
            <div className="m-10 ml-0 md:ml-10 flex">
                <div >
                    <p className="flex text-3xl font-medium gap-x-2"><Image src={'/socials.png'} alt="info" height={40} width={40} />Socials</p>
                </div>
                <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
            </div>
            <form className="md:ml-10 ">
                <div className="lg:flex gap-x-5">
                    <div>
                        <select name="socials" className="w-[95%] lg:w-60 p-2 outline-3 outline-white ring-3 ring-gray-400 border-gray-400 border-1 rounded-xl"
                        value={platform}
                        onChange={(e)=>{
                            setPlatform(e.target.value)
                        }}>
                            <option value="select">Select</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Github">Github</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Instagram">Instagram</option>
                        </select>
                    </div>
                    <div className="mt-5 lg:mt-0">
                        <input type="text" className="w-[95%] lg:w-130 p-2 focus:outline-none border-gray-400 border-1 rounded-xl bg-white" placeholder="Enter URL"
                        value={link} 
                        onChange={(e)=>{
                            setLink(e.target.value)
                        }}
                        />
                        <button onClick={addSocials} type="button" className="w-[95%] bg-[#aebecf] mt-5 lg:mt-0 lg:w-20 p-2 border-gray-400 border-1 rounded-xl hover:outline-2 hover:outline-white hover:ring-2 hover:ring-gray-500 active:bg-[#97a9bc]">Add</button>
                    </div>
                </div>
            </form>
            <hr className="m-10 text-gray-400"/>
            <div className="md:ml-10">
                {
                    platformArr.map((name, index)=>(
                        <li key={index}>{name}-<Link href={linkArr[index]}>visit here</Link></li>
                    ))
                }
            </div>
            <div className="flex ml-auto sm:hidden justify-center mt-5 hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
        </>
    )
}