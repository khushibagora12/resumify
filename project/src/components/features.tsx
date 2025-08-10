import { poppins } from "./ui/fonts"
import Image from "next/image"

export default function Features() {
    return (
        <>
            <div className="w-full p-10 justify-center">
                <h1 className={`text-[#123458] ${poppins.className} font-bold text-4xl w-full flex justify-center`}>Features</h1>
                <h1 className={`text-[#123458] ${poppins.className}  text-xl w-full flex justify-center align-middle`}>The fastest way to setup a portfolio + resume</h1>
                <div className="relative grid grid-cols-1 m-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    <div className={`${poppins.className} h-60 w-[90%] bg-white rounded-2xl text-gray-500 shadow-2xl flex justify-center text-lg p-5 hover:shadow-black`}>
                        <div className="block">
                            <div className="flex justify-center m-5"><Image src={"/resumeIcon.png"} alt="resume" height={40} width={40} /></div>
                            Interactive resume+portfolio builder.
                        </div>
                    </div>
                    <div className={`${poppins.className} h-60 w-[90%] bg-white rounded-2xl text-gray-500 shadow-2xl flex justify-center text-lg p-5 hover:shadow-black`}>

                        <div className="block">
                            <div className="flex justify-center m-5"><Image src={"/save-money.png"} alt="resume" height={40} width={40} /></div>
                            Free of cost.
                        </div>
                    </div>
                    <div className={`${poppins.className} h-60 w-[90%] bg-white rounded-2xl text-gray-500 shadow-2xl flex justify-center text-lg p-5 hover:shadow-black`}>
                        <div className="block">
                            <div className="flex justify-center m-5"><Image src={"/search-engine.png"} alt="resume" height={40} width={40} /></div>
                            Custom Domain.
                        </div>
                    </div>
                    <div className={`${poppins.className} h-60 w-[90%] bg-white rounded-2xl text-gray-500 shadow-2xl flex justify-cente text-lg p-5 hover:shadow-black`}>
                        <div className="block">
                            <div className="flex justify-center m-5"><Image src={"/folder.png"} alt="resume" height={40} width={40} /></div>
                            Manage your portfolio and resume at one place.
                        </div>
                    </div>
                    <div className={`${poppins.className} h-60 w-[90%] bg-white rounded-2xl text-gray-500 shadow-2xl flex justify-center text-lg p-5 hover:shadow-black`}>
                        <div className="block">
                            <div className="flex justify-center m-5"><Image src={"/pdf.png"} alt="resume" height={40} width={40} /></div>
                            Resume download as pdf.
                        </div>
                    </div>
                    <div className={`${poppins.className} h-60 w-[90%] bg-white rounded-2xl text-gray-500 shadow-2xl flex justify-center text-lg p-5 hover:shadow-black`}>
                        <div className="block">
                            <div className="flex justify-center m-5"><Image src={"/snap.png"} alt="resume" height={40} width={40} /></div>
                            Easy to use.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}