import Image from "next/image"
import { poppins } from "@/components/ui/fonts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Templates() {
    return (
        <>
                <Card className="m-10 bg-white h-70 w-70">
                    <CardHeader>
                        <CardTitle className="flex">
                            <Image src={"/Passport-Size-Photo.png"} height={40} width={40} alt="img" />
                            <div className={`${poppins.className} ml-5`}>
                                <p className="text-lg">John Doe</p>
                                <p className="text-sm font-light">Software Engineer</p>
                            </div>
                        </CardTitle>
                        <CardDescription className={`${poppins.className} text-sm font-semibold m-2`}>Profile</CardDescription>
                        <hr className="text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 p-1">
                            <p className="text-xs">About: </p>
                            <div className="text-xs"><p className="font-medium">mechanical engineer</p> <p>Lorem ipsum tum rerum!</p></div>
                        </div>
                        <div className="grid grid-cols-2 p-1">
                            <p className="text-xs">Education: </p>
                            <div className="text-xs"><p className="font-medium">B.tech(CS)</p> <p>Lorem ipselit eos voluptatum rerum!</p></div>
                        </div>
                        
                    </CardContent>
                </Card>
        </>
    )
}