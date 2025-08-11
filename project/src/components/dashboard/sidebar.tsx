'use client'
import { Home,FileUser,File,Briefcase,LogOut,UserCheck,MessageSquareText } from "lucide-react"
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react"
import { limelight } from "../ui/fonts"


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },  {
    title: "My Information",
    url: "/dashboard/myInformation",
    icon: UserCheck,
  },
  {
    title: "Portfolio",
    url: "/dashboard/portfolio",
    icon: Briefcase,
  },
  {
    title: "Resume",
    url: "/dashboard/resume",
    icon: FileUser,
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: File,
  },
  {
    title: "Feedback",
    url: "/dashboard/feedback",
    icon: MessageSquareText,
  },

]
export default function AppSidebar() {

  return (
    <UISidebar >
    <SidebarContent className="bg-[#525860] font--poppins font-semibold text-white" >
          
      <SidebarGroup>
        <SidebarGroupLabel>
          <div className="flex-shrink-0 mt-5">
                      <div className="flex gap-4">
                      <h1 className={` text-4xl ${limelight.className} font-bold text-white pt-3 `}> <span className="text-5xl underline">R</span>esumify</h1>
                      </div>
                  </div>
        </SidebarGroupLabel>
        <SidebarGroupContent  className="mt-10">
          <SidebarMenu >
            {items.map((item) => (
              <SidebarMenuItem key={item.title} >
                <SidebarMenuButton asChild className="hover:bg-[#69707a] text-white" >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    
    </SidebarContent>
    <SidebarFooter className="bg-[#525860]" >
      {/* logout button */}
      <SidebarMenuItem  >
        <SidebarMenuButton asChild className="hover:bg-[#69707a] text-white" onClick={() => {signOut({callbackUrl : '/login'})}} >
          <a >
            <LogOut />
            <span>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      </SidebarFooter>
  </UISidebar>
  )
}