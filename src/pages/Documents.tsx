
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Grid, List, Calendar, Tag, Eye, Download } from "lucide-react";

const Documents = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const documents = [
    {
      id: 1,
      name: "Contrato de Prestação de Serviços - ABC Corp",
      type: "Contrato",
      uploadDate: "2024-06-05",
      status: "Analisado",
      clauses: 23,
      size: "2.3 MB",
      tags: ["prestação", "serviços", "ABC"],
      priority: "alta",
      lastAnalysis: "2024-06-05 14:30",
    },
    {
      id: 2,
      name: "Acordo de Confidencialidade - XYZ Ltd",
      type: "NDA",
      uploadDate: "2024-06-04",
      status: "Em análise",
      clauses: 12,
      size: "1.8 MB",
      tags: ["confidencialidade", "XYZ"],
      priority: "média",
      lastAnalysis: "2024-06-04 16:20",
    },
    {
      id: 3,
      name: "Contrato de Trabalho - João Silva",
      type: "Trabalhista",
      uploadDate: "2024-06-03",
      status: "Analisado",
      clauses: 18,
      size: "1.5 MB",
      tags: ["trabalho", "CLT"],
      priority: "baixa",
      lastAnalysis: "2024-06-03 11:15",
    },
    {
      id: 4,
      name: "Termo de Parceria - DEF Inc",
      type: "Parceria",
      uploadDate: "2024-06-02",
      status: "Pendente",
      clauses: 0,
      size: "3.1 MB",
      tags: ["parceria", "DEF"],
      priority: "alta",
      lastAnalysis: null,
    },
    {
      id: 5,
      name: "Contrato de Locação - Imóvel Comercial",
      type: "Locação",
      uploadDate: "2024-06-01",
      status: "Analisado",
      clauses: 31,
      size: "4.2 MB",
      tags: ["locação", "comercial"],
      priority: "média",
      lastAnalysis: "2024-06-01 09:45",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Analisado": return "bg-green-100 text-green-800";
      case "Em análise": return "bg-yellow-100 text-yellow-800";
      case "Pendente": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "bg-red-100 text-red-800";
      case "média": return "bg-yellow-100 text-yellow-800";
      case "baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-900">Documentos</h1>
          <p className="text-legal-600 mt-2">
            Gerencie e visualize todos os seus documentos jurídicos
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card className="border-legal-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-legal-400" />
              <Input
                placeholder="Buscar por nome, tipo ou tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="contrato">Contratos</SelectItem>
                  <SelectItem value="nda">NDAs</SelectItem>
                  <SelectItem value="trabalhista">Trabalhista</SelectItem>
                  <SelectItem value="locacao">Locação</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="analisado">Analisado</SelectItem>
                  <SelectItem value="analise">Em análise</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer data</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Documentos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-legal-600">
            {filteredDocuments.length} documento(s) encontrado(s)
          </p>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="border-legal-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-legal-100 rounded-lg">
                        <FileText className="h-6 w-6 text-legal-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-legal-900 truncate">
                          {doc.name}
                        </h3>
                        
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                          <Badge className={`${getStatusColor(doc.status)} border-0 text-xs`}>
                            {doc.status}
                          </Badge>
                          <Badge className={`${getPriorityColor(doc.priority)} border-0 text-xs`}>
                            {doc.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-6 mt-3 text-sm text-legal-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {doc.uploadDate}
                          </span>
                          <span>{doc.size}</span>
                          <span>{doc.clauses} cláusulas</span>
                          {doc.lastAnalysis && (
                            <span>Análise: {doc.lastAnalysis}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <Tag className="h-3 w-3 text-legal-400" />
                          <div className="flex gap-1 flex-wrap">
                            {doc.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 bg-legal-100 text-legal-600 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="border-legal-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-legal-100 rounded-lg">
                      <FileText className="h-8 w-8 text-legal-600" />
                    </div>
                    <div className="flex gap-1">
                      <Badge className={`${getStatusColor(doc.status)} border-0 text-xs`}>
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-base text-legal-900 line-clamp-2">
                    {doc.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {doc.type} • {doc.size}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-legal-500">{doc.clauses} cláusulas</span>
                    <span className="text-legal-500">{doc.uploadDate}</span>
                  </div>
                  
                  <div className="flex gap-1 flex-wrap">
                    {doc.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-legal-100 text-legal-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-legal-100 text-legal-600 rounded">
                        +{doc.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
