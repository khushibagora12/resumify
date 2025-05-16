import Flipped from "./flippedImage"
import { poppins } from "./ui/fonts"
import Link from "next/link"
export default function Body() {
    return (
        <>
            <section id="home" className="h-screen flex">
                <div className="m-5 mt-20 bg-[#F1EFEC]">
                    <h1 className={`text-[#123458] ${poppins.className} text-6xl font-extrabold m-5`}>CREATE  STUNNING</h1>
                    <h2 className={`text-[#123458] ${poppins.className} text-3xl font-light m-5 mt-0`}>portfolio and resume in minutes</h2>
                    <p className="m-5 w-[90%] sm:w-100">Welcome to your one-stop solution for building a standout digital presence! This Portfolio and Resume Generator is designed to help you create professional portfolios and tailored resumes with ease — no design skills required. Whether you're a student, developer, designer, or job seeker, this tool empowers you to showcase your skills, projects, and achievements in a clean, beautiful layout.</p>
                    <button className="bg-[#D4C9BE] text-[#123458] font-bold p-3 rounded-md w-40 ml-5 hover:bg-[#ada194]" ><Link href="/signup">Get Yours Now</Link></button>
                </div>
                <div className="w-1/2 hidden lg:flex justify-end [perspective:1000px]">
                <Flipped/>
                </div>
            </section>
            <section>

            </section>
        </>
    )
}