
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, FileText, TrendingUp, Users, Calendar } from "lucide-react";

const Reports = () => {
  const usageData = [
    { month: "Jan", documents: 45, searches: 120, alerts: 8 },
    { month: "Fev", documents: 52, searches: 150, alerts: 12 },
    { month: "Mar", documents: 48, searches: 180, alerts: 15 },
    { month: "Abr", documents: 61, searches: 210, alerts: 18 },
    { month: "Mai", documents: 58, searches: 195, alerts: 20 },
    { month: "Jun", documents: 67, searches: 240, alerts: 23 },
  ];

  const documentTypeData = [
    { name: "Contratos", value: 45, color: "#475569" },
    { name: "NDAs", value: 25, color: "#64748b" },
    { name: "Trabalhista", value: 20, color: "#94a3b8" },
    { name: "Locação", value: 10, color: "#cbd5e1" },
  ];

  const alertsData = [
    { term: "Rescisão", count: 23 },
    { term: "Confidencialidade", count: 18 },
    { term: "Penalidades", count: 15 },
    { term: "Força Maior", count: 12 },
    { term: "Garantias", count: 8 },
  ];

  const userMetrics = [
    {
      name: "Dr. Ana Silva",
      documents: 156,
      searches: 245,
      alerts: 12,
      efficiency: 92,
    },
    {
      name: "Dr. Carlos Santos",
      documents: 134,
      searches: 198,
      alerts: 8,
      efficiency: 88,
    },
    {
      name: "Dra. Maria Costa",
      documents: 98,
      searches: 167,
      alerts: 15,
      efficiency: 95,
    },
  ];

  const summaryMetrics = [
    {
      title: "Total de Documentos",
      value: "1,247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Buscas Realizadas",
      value: "3,856",
      change: "+18%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Alertas Disparados",
      value: "234",
      change: "+8%",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      title: "Usuários Ativos",
      value: "12",
      change: "+2",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-900">Relatórios e Métricas</h1>
          <p className="text-legal-600 mt-2">
            Análise detalhada do uso e performance do sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button className="legal-gradient text-white hover:opacity-90">
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((metric) => (
          <Card key={metric.title} className="border-legal-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-legal-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-legal-900">{metric.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {metric.change} vs. período anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Uso Mensal */}
        <Card className="border-legal-200">
          <CardHeader>
            <CardTitle className="text-legal-900">Uso Mensal do Sistema</CardTitle>
            <CardDescription>
              Documentos processados, buscas e alertas por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="documents" fill="#475569" name="Documentos" />
                <Bar dataKey="searches" fill="#64748b" name="Buscas" />
                <Bar dataKey="alerts" fill="#94a3b8" name="Alertas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Tipo de Documento */}
        <Card className="border-legal-200">
          <CardHeader>
            <CardTitle className="text-legal-900">Distribuição por Tipo</CardTitle>
            <CardDescription>
              Tipos de documentos mais processados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {documentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Alertas */}
        <Card className="border-legal-200">
          <CardHeader>
            <CardTitle className="text-legal-900">Alertas Mais Frequentes</CardTitle>
            <CardDescription>
              Termos que mais geraram alertas no período
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertsData.map((alert, index) => (
                <div key={alert.term} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-legal-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-legal-700">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-medium text-legal-900">{alert.term}</span>
                  </div>
                  <Badge variant="secondary" className="bg-legal-100 text-legal-700">
                    {alert.count} alertas
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métricas por Usuário */}
        <Card className="border-legal-200">
          <CardHeader>
            <CardTitle className="text-legal-900">Performance por Usuário</CardTitle>
            <CardDescription>
              Estatísticas de uso individuais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userMetrics.map((user) => (
                <div key={user.name} className="p-4 border border-legal-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-legal-900">{user.name}</h4>
                    <Badge 
                      className={`${
                        user.efficiency >= 90 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      } border-0`}
                    >
                      {user.efficiency}% eficiência
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-legal-900">{user.documents}</div>
                      <div className="text-legal-600">Documentos</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-legal-900">{user.searches}</div>
                      <div className="text-legal-600">Buscas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-legal-900">{user.alerts}</div>
                      <div className="text-legal-600">Alertas</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tendência de Crescimento */}
      <Card className="border-legal-200">
        <CardHeader>
          <CardTitle className="text-legal-900">Tendência de Crescimento</CardTitle>
          <CardDescription>
            Evolução do uso do sistema ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="documents" 
                stroke="#475569" 
                strokeWidth={3}
                name="Documentos"
              />
              <Line 
                type="monotone" 
                dataKey="searches" 
                stroke="#64748b" 
                strokeWidth={3}
                name="Buscas"
              />
              <Line 
                type="monotone" 
                dataKey="alerts" 
                stroke="#94a3b8" 
                strokeWidth={3}
                name="Alertas"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
