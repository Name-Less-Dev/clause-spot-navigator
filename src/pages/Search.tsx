
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Filter, FileText, Calendar, Clock } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const searchResults = [
    {
      id: 1,
      document: "Contrato de Prestação de Serviços - ABC Corp",
      clause: "Cláusula de Rescisão por Justa Causa",
      content: "O presente contrato poderá ser rescindido por qualquer das partes, independentemente de aviso prévio ou indenização, nas seguintes hipóteses: a) descumprimento de qualquer cláusula contratual...",
      relevance: 95,
      date: "2024-06-05",
      page: 3,
      section: "Seção IV",
    },
    {
      id: 2,
      document: "Acordo de Confidencialidade - XYZ Ltd",
      clause: "Obrigações de Confidencialidade",
      content: "As partes se comprometem a manter em sigilo todas as informações confidenciais recebidas durante a vigência deste acordo, sendo vedada qualquer divulgação a terceiros...",
      relevance: 88,
      date: "2024-06-04",
      page: 2,
      section: "Cláusula 3",
    },
    {
      id: 3,
      document: "Contrato de Trabalho - João Silva",
      clause: "Jornada de Trabalho e Horas Extras",
      content: "A jornada de trabalho será de 8 (oito) horas diárias e 44 (quarenta e quatro) horas semanais. As horas trabalhadas além da jornada normal serão consideradas extras...",
      relevance: 82,
      date: "2024-06-03",
      page: 1,
      section: "Cláusula 5",
    },
  ];

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return "bg-green-100 text-green-800";
    if (relevance >= 75) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-legal-900">Busca por Cláusulas</h1>
        <p className="text-legal-600 mt-2">
          Encontre cláusulas específicas em seus documentos jurídicos
        </p>
      </div>

      {/* Barra de Busca */}
      <Card className="border-legal-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-legal-400" />
              <Input
                placeholder="Digite sua busca em linguagem natural (ex: 'cláusulas sobre rescisão de contrato')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button 
              className="h-12 px-8 legal-gradient text-white hover:opacity-90"
            >
              Buscar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Filtros */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-legal-200">
              <div>
                <Label>Tipo de Documento</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="contract">Contratos</SelectItem>
                    <SelectItem value="agreement">Acordos</SelectItem>
                    <SelectItem value="nda">NDAs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Data de Upload</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Qualquer data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer data</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Última semana</SelectItem>
                    <SelectItem value="month">Último mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Relevância Mínima</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Qualquer</SelectItem>
                    <SelectItem value="90">90% ou mais</SelectItem>
                    <SelectItem value="75">75% ou mais</SelectItem>
                    <SelectItem value="50">50% ou mais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Ordenar por</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Relevância" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="date">Data</SelectItem>
                    <SelectItem value="document">Documento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-legal-900">
            Resultados da Busca
            <span className="ml-2 text-legal-500 font-normal">
              ({searchResults.length} resultados encontrados)
            </span>
          </h2>
        </div>

        {searchResults.map((result) => (
          <Card key={result.id} className="border-legal-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-legal-900">
                    {result.clause}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {result.document}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {result.date}
                    </span>
                  </CardDescription>
                </div>
                <Badge 
                  className={`${getRelevanceColor(result.relevance)} border-0`}
                >
                  {result.relevance}% relevante
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-legal-50 p-4 rounded-lg border-l-4 border-legal-400">
                <p className="text-legal-700 leading-relaxed">
                  {result.content}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-sm text-legal-500">
                  <span>Página {result.page}</span>
                  <span>{result.section}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Contexto
                  </Button>
                  <Button variant="outline" size="sm">
                    Abrir Documento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo Automático */}
      <Card className="border-legal-200 bg-gradient-to-r from-legal-50 to-legal-100">
        <CardHeader>
          <CardTitle className="text-legal-900">Resumo Automático</CardTitle>
          <CardDescription>
            Análise das cláusulas encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-legal max-w-none">
            <p className="text-legal-700 leading-relaxed">
              Com base nos resultados encontrados, identificamos padrões relacionados a 
              <strong> cláusulas de rescisão e confidencialidade</strong>. Os documentos 
              analisados mostram consistência nas obrigações contratuais, com especial 
              atenção às condições de término antecipado e proteção de informações 
              sensíveis.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-bold text-legal-900">3</div>
                <div className="text-sm text-legal-600">Documentos analisados</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-bold text-legal-900">88%</div>
                <div className="text-sm text-legal-600">Relevância média</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-bold text-legal-900">5</div>
                <div className="text-sm text-legal-600">Cláusulas similares</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;
