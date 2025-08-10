import { bebas, limelight } from "./ui/fonts"
import Link from "next/link"
export default function Navbar() {
    return (
        <>
            <div className="flex items-center p-5 bg-[#E6F0F4] overflow-x-hidden">
                <div className="flex-shrink-0">
                    <div className="flex gap-4">
                        <div className={`text-4xl p-3 ${limelight.className} font-bold text-[#1C3D5A]`}>
                            <span className="text-5xl underline">R</span>esumify
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex justify-center flex-grow gap-6 text-[#1C3D5A] font-bold ">
                    <div className="hover:text-shadow-lg"><a href="#features">Features</a></div>
                    <div className="hover:text-shadow-lg"><a href="#faqs">FAQs</a></div>
                    <div className="hover:text-shadow-lg"><a href="#contact">Contact us</a></div>
                </div>

                <div className="flex justify-center items-center gap-4 ml-5 flex-wrap">
                    <button className="bg-[#aebecf] text-[#123458] font-bold p-3 rounded-sm w-25 hover:outline-1 hover:outline-white hover:shadow-gray-400 hover:shadow-md active:bg-[#8a9caf] md:w-30">
                        <Link href="/login">
                            Login
                        </Link>
                    </button>
                    <button className="bg-[#525860] text-white font-bold p-3 rounded-sm w-30 hover:outline-1 hover:outline-white hover:shadow-gray-400 hover:shadow-md active:bg-[#414851] md:w-35">
                        <Link href="/signup">
                            Get Started
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}