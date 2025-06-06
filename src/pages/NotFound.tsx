
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-legal-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-24 h-24 legal-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">404</span>
        </div>
        
        <h1 className="text-3xl font-bold text-legal-900 mb-4">
          Página não encontrada
        </h1>
        
        <p className="text-legal-600 mb-8">
          A página que você está procurando não existe ou foi movida. 
          Verifique o endereço ou retorne à página inicial.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          
          <Button asChild className="legal-gradient text-white hover:opacity-90">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Página Inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
