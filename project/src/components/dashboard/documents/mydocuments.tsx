'use client'
import { poppins } from "@/components/ui/fonts";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function MydocumentsPage(){
    const router = useRouter()
    const handlePortfolio = () => {
        router.push("/dashboard/documents/myPortfolio")
    }
    const handleResume = () => {
        router.push("/dashboard/documents/myResume")
    }
    return(
        <>
        <h1 className={`${poppins.className} text-3xl font-semibold m-10 mt-5`}>My Documents</h1>
        <div className="block md:flex">
            <div className="bg-[#aebecf] w-[60%] sm:w-[40%] md:w-[25%] h-50 m-10 rounded-xl p-10" onClick={handlePortfolio}>
                <div className=""><Image src={"/documents.png"} alt="documents" height={40} width={40}/></div>
                <p className="font-bold text-2xl mt-5">Portfolio</p>
            </div>
            <div className="bg-[#aebecf] w-[60%] sm:w-[40%] md:w-[25%] h-50 m-10 rounded-xl p-10 " onClick={handleResume}>
                <div className=""><Image src={"/documents.png"} alt="documents" height={40} width={40}/></div>
                <p className="font-bold text-2xl mt-5">Resume</p>
            </div>
        </div>
        </>
    )
}