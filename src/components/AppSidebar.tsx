
import { Calendar, FileText, Search, Bell, BarChart3, Upload, Home } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Upload de Documentos",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "Busca por Cláusulas",
    url: "/search",
    icon: Search,
  },
  {
    title: "Alertas",
    url: "/alerts",
    icon: Bell,
  },
  {
    title: "Documentos",
    url: "/documents",
    icon: FileText,
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-legal-200">
      <SidebarHeader className="p-6 border-b border-legal-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 legal-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <div>
            <h2 className="font-semibold text-legal-800">ClauseSpot</h2>
            <p className="text-xs text-legal-500">Sistema Jurídico</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-legal-600 font-medium">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="data-[active=true]:bg-legal-100 data-[active=true]:text-legal-800 hover:bg-legal-50"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
