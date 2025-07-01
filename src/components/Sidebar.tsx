
import {
  Home,
  BookOpen,
  Play,
  BarChart3,
  FolderOpen,
  Settings,
  User
} from "lucide-react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "library", title: "Mes Quiz", icon: BookOpen },
  { id: "live", title: "Session Live", icon: Play },
  { id: "history", title: "Historique", icon: BarChart3 },
  { id: "settings", title: "Paramètres", icon: Settings },
  { id: "profile", title: "Profil", icon: User },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarContainer className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-4 self-end" />
      
      <SidebarContent className="bg-white border-r border-slate-200">
        <div className="p-6 border-b border-slate-100">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-800">QuizMaster</h2>
                <p className="text-sm text-slate-500">Interface Enseignant</p>
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeView === item.id
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <button onClick={() => onNavigate(item.id)}>
                      <item.icon className="w-5 h-5 mr-3" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
