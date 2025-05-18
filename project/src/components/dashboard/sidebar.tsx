'use client'
import { Home, Settings,FileUser,HandCoins,File,Briefcase,LogOut } from "lucide-react"
 
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


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
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
    title: "Donate",
    url: "/dashboard/donate",
    icon: HandCoins,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]
export default function AppSidebar() {
  //const pathname = usePathname()

  return (
    // <aside className="w-64 bg-[#112240] text-white min-h-screen py-6 px-4">
    //   <h1 className="text-2xl font-bold mb-8">SHIELD</h1>
    //   <nav className="space-y-4">
    //     {navItems.map(({ label, href }) => (
    //       <Link
    //         key={href}
    //         href={href}
    //         className={cn(
    //           'block px-4 py-2 rounded hover:bg-[#0f1c2e]',
    //           pathname === href && 'bg-[#0f1c2e] font-semibold'
    //         )}
    //       >
    //         {label}
    //       </Link>
    //     ))}
    //   </nav>
    // </aside>
    <UISidebar >
    <SidebarContent className="bg-[#123458] font--poppins font-semibold text-white" >
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent >
          <SidebarMenu >
            {items.map((item) => (
              <SidebarMenuItem key={item.title} >
                <SidebarMenuButton asChild className="hover:bg-[#355C7C] text-white" >
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
    <SidebarFooter className="bg-[#123458]" >
      {/* logout button */}
      <SidebarMenuItem  >
        <SidebarMenuButton asChild className="hover:bg-[#355C7C] text-white">
          <a href="/logout">
            <LogOut />
            <span>Logout</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
      </SidebarFooter>
  </UISidebar>
  )
}