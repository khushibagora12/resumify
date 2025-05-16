import { bebas } from "./ui/fonts"
import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"
export default function Navbar(){
    return(
        <>
        <div className="flex items-center p-5 bg-[#F1EFEC] overflow-x-hidden">
            <div className="flex-shrink-0">
                <div className="flex gap-4">
                <Image
                src="/plainLogo.png"
                width={60}
                height={60}
                alt="logo"
                />
                <h1 className={`${bebas.className} text-4xl font-mono font-bold text-[#123458] pt-3`}>DevSnap</h1>
                </div>
            </div>
            <div className="hidden sm:flex justify-center flex-grow gap-6 text-[#123458] font-bold ">
                <div><a href="#features">Features</a></div>
                <div><a href="#faqs">FAQs</a></div>
                <div><a href="#contact">Contact us</a></div>
            </div>

            <div className="flex justify-center items-center gap-4 ml-5 flex-wrap">
                <button className="bg-[#D4C9BE] text-[#123458] font-bold p-3 rounded-sm w-25 hover:bg-[#ada194] md:w-30">
                    <Link href="/login">
                        Login
                    </Link>
                </button>
                <button className="bg-[#123458] text-white font-bold p-3 rounded-sm w-30 hover:bg-[#1c4a7b] md:w-35">
                    <Link href="/signup">
                        Get Started
                    </Link>
                </button>
            </div>
        </div>
        </>
    )
}