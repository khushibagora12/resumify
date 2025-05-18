import AppSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"


export default function Layout({
    children,
}: {
    children: React.ReactNode
}
) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-[#F1EFEC]">
                {children}
            </main>
        </SidebarProvider>
    )
}