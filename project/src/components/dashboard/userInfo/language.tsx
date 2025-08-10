import Image from "next/image"
import { useState } from "react"
import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'
import { poppins } from "@/components/ui/fonts"
import {toast} from 'react-toastify'

export default function Languages({ onDataChange }: { onDataChange: (data: any) => void }) {
    const [language, setLanguage] = useState('')
    const [langArr, setLangArr] = useState<string[]>([])
    const [lock, setLock] = useState(false)

    const submitHandler = () => {
        if(langArr.length === 0){
            toast("empty field")
        }else{
        setLock(true)
        console.log("lang: ", langArr)
        onDataChange(langArr)
        toast("Data Saved")
        }
    }
    const addLanguage = () => {
        if(language !== ''){
            setLangArr([...langArr, language])
            setLanguage('')
        }
    }
    return (
        <>
            <div className="m-10 ml-0 md:ml-10 flex">
                <div>
                    <p className="flex text-3xl font-medium" ><Image src={'/language.png'} alt="info" height={40} width={40} className="mr-2" />Languages</p>
                </div>
                <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
            </div>
            <form>
                <div className={`${poppins.className} text-xl font-medium m-5 ml-0 md:ml-10`}>Add language</div>
                <div className="md:ml-10">
                    <input type="text" placeholder='Add language' className=' border-1 border-gray-400 bg-white p-2 rounded-xl w-[90%] focus:outline-none' 
                    value={language}
                    onChange={(e)=>{setLanguage(e.target.value)}}
                    />
                    <button type="button" onClick={addLanguage} className="p-2 w-[90%] mt-5 md:w-auto border-1 border-gray-500 rounded-lg hover:outline-2 hover:outline-white hover:ring-2 hover:ring-gray-500 bg-[#aebecf] active:bg-[#97a9bc]">Add</button>
                </div>
            </form>
            <hr className="m-10 text-gray-400" />
            <div className="md:ml-10">
                {langArr.map((lang, index)=>(
                    <li key={index}>{lang}</li>
                ))}
            </div>
            <div className="flex ml-auto sm:hidden mt-5 justify-center hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
        </>
    )
}