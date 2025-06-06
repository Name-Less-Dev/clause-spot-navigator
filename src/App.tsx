
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Alerts from "./pages/Alerts";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-legal-50">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
