import Certificates from "@/components/dashboard/userInfo/certificates";
import Education from "@/components/dashboard/userInfo/education";
import UserInfo from "@/components/dashboard/userInfo/info";
import AppSidebar from "@/components/dashboard/sidebar";
import Skills from "@/components/dashboard/userInfo/skills";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <>
            <div className="h-screen w-[90%] flex justify-center items-center bg-[#F1EFEC]">

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