import { LockKeyholeOpen, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { poppins } from '@/components/ui/fonts'

export default function Hobbies({ onDataChange }: { onDataChange: (data: string[]) => void }) {
    const [lock, setLock] = useState(false)
    const [hobby, setHobby] = useState('')
    const [hobbyArr, setHobbyArr] = useState<string[]>([])

    const submitHandler = () => {
        if (hobbyArr.length === 0) {
            toast("empty field")
        } else {
            setLock(true)
            onDataChange(hobbyArr)
            toast("Data Saved")
        }
    }
    const addHobby = () => {
        if (hobby !== '') {
            setHobbyArr([...hobbyArr, hobby])
            setHobby('')
        }
    }
    return (
        <>
            <div className="m-10 ml-0 md:ml-10 flex">
                <div>
                    <p className="flex text-3xl font-medium" ><Image src={'/hobbies.png'} alt="info" height={40} width={40} className="mr-2" />Hobbies</p>
                </div>
                <div className="hidden ml-auto sm:flex hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
            </div>
            <form>
                <div className={`${poppins.className} text-xl font-medium m-5 ml-0 md:ml-10`}>Add hobby</div>
                <div className="md:ml-10">
                    <input type="text" placeholder='Add hobby' className=' border-1 border-gray-400 bg-white p-2 rounded-xl w-[90%] focus:outline-none'
                        value={hobby}
                        onChange={(e) => { setHobby(e.target.value) }}
                    />
                    <button type="button" onClick={addHobby} className="p-2 w-[90%] mt-5 md:w-auto border-1 border-gray-500 rounded-lg hover:outline-2 hover:outline-white hover:ring-2 hover:ring-gray-500 bg-[#aebecf] active:bg-[#97a9bc]">Add</button>
                </div>
            </form>
            <hr className="m-10 text-gray-400" />
            <div className="md:ml-10">
                {hobbyArr.map((hob, index) => (
                    <li key={index}>{hob}</li>
                ))}
            </div>
            <div className="flex ml-auto sm:hidden hover:cursor-pointer p-1 border-1 border-gray-400 rounded-lg justify-center" onClick={submitHandler}>{lock ? <LockKeyhole size={32} color="#2645a1" /> : <LockKeyholeOpen size={32} color="#2645a1" />} <div className="m-2 font-bold">Lock</div></div>
        </>
    )
}