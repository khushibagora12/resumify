import Certificates from "@/components/dashboard/certificates";
import Education from "@/components/dashboard/education";
import UserInfo from "@/components/dashboard/info";
import Skills from "@/components/dashboard/skills";
import { Button } from "@/components/ui/button";
export default function Dashboard() {
    const onSubmit = (data: any) => {
        console.log("submitted data: ", data);
    };
    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center bg-[#F1EFEC]">

                <div className=" rounded-3xl shadow-[0_0_20px_10px_rgba(152,152,152,0.5)] h-[90%] w-[90%] p-10 overflow-y-scroll">

                    <section className="min-h-screen">
                        <UserInfo />
                    </section>
                    <section className="min-h-screen">
                        <Skills />
                    </section>
                    <section className="min-h-screen">
                        <Education />
                    </section>
                    <section className="min-h-screen">
                        <Certificates />
                    </section>
                    <Button type='submit'>Submit</Button>
                </div>
            </div>
        </>
    )
}