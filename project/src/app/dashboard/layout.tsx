import AppSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function Layout({
    children,
}: {
    children: React.ReactNode
}
) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-[#E6F0F4]">
                {<SidebarTrigger className=""/>}
                {children}
            </main>
        </SidebarProvider>
    )
}