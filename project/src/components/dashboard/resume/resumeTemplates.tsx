import { poppins } from "@/components/ui/fonts"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Templates from "./templates"

export default function UserResume() {
    return (
        <>
            <div className="grid grid-cols-2">
                <div className="m-15">
                    <h1 className={`text-[#123458] ${poppins.className} text-3xl mb-5`}>YOUR RESUME,</h1>
                    <h2 className={`text-black ${poppins.className} text-xl`}>Below is a preview of your resume</h2>

                </div>
                <div className="flex justify-end m-auto">
                    <Button className="bg-[#123458] text-white text-lg h-[70px]">Create my resume</Button>
                </div>
            </div>
            <div className="lg:w-[50%]">
                <Card className="m-10 bg-white ">
                    <CardHeader>
                        <CardTitle className="flex">
                            <Image src={"/Passport-Size-Photo.png"} height={40} width={70} alt="img" />
                            <div className={`${poppins.className} ml-10`}>
                                <p className="text-2xl">John Doe</p>
                                <p className="text-lg font-light">Software Engineer</p>
                            </div>
                        </CardTitle>
                        <CardDescription className={`${poppins.className} text-md font-semibold m-2`}>Profile</CardDescription>
                        <hr className="text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 p-3">
                            <p>About: </p>
                            <div className="text-sm"><p className="font-medium">mechanical engineer</p> <p>Lorem ipsum dolomenda velit eos voluptatum rerum!</p></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 p-3">
                            <p>Education: </p>
                            <div className="text-sm"><p className="font-medium">B.tech(CS)</p> <p>Lorem ipsum dolomenda velit eos voluptatum rerum!</p></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 p-3">
                            <p>Skills: </p>
                            <div className="text-sm"><p className="font-medium">web dev</p></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <h1 className={`m-auto ml-10 text-[#123458] ${poppins.className} text-3xl`}>SELECT A TEMPLATE</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <Templates />
                    <Templates />
                </div>
            </div>
        </>
    )
}