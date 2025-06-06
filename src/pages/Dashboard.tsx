
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Search, Bell, TrendingUp, Clock, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const metrics = [
    {
      title: "Documentos Analisados",
      value: "1,247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Buscas Realizadas",
      value: "3,856",
      change: "+8%",
      icon: Search,
      color: "text-green-600",
    },
    {
      title: "Alertas Ativos",
      value: "23",
      change: "+3",
      icon: Bell,
      color: "text-orange-600",
    },
    {
      title: "Cláusulas Encontradas",
      value: "892",
      change: "+15%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const recentDocuments = [
    {
      name: "Contrato de Prestação de Serviços - Empresa ABC",
      uploadDate: "2024-06-05",
      status: "Analisado",
      clauses: 23,
    },
    {
      name: "Acordo de Confidencialidade - Cliente XYZ",
      uploadDate: "2024-06-04",
      status: "Em análise",
      clauses: 12,
    },
    {
      name: "Contrato de Trabalho - João Silva",
      uploadDate: "2024-06-03",
      status: "Analisado",
      clauses: 18,
    },
  ];

  const criticalAlerts = [
    {
      document: "Contrato ABC Corp",
      clause: "Cláusula de rescisão antecipada",
      severity: "Alta",
      date: "2024-06-05",
    },
    {
      document: "Acordo XYZ Ltd",
      clause: "Penalidades por atraso",
      severity: "Média",
      date: "2024-06-04",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-legal-900">Dashboard</h1>
        <p className="text-legal-600 mt-2">
          Visão geral dos seus documentos e análises jurídicas
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
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
                {metric.change} vs. mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documentos Recentes */}
        <Card className="border-legal-200">
          <CardHeader>
            <CardTitle className="text-legal-900">Documentos Recentes</CardTitle>
            <CardDescription>
              Últimos documentos enviados para análise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDocuments.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-legal-100 rounded-lg hover:bg-legal-50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-legal-900 text-sm">{doc.name}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-legal-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {doc.uploadDate}
                    </span>
                    <Badge 
                      variant={doc.status === "Analisado" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {doc.status}
                    </Badge>
                    <span className="text-xs text-legal-500">
                      {doc.clauses} cláusulas
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Ver todos os documentos
            </Button>
          </CardContent>
        </Card>

        {/* Alertas Críticos */}
        <Card className="border-legal-200">
          <CardHeader>
            <CardTitle className="text-legal-900">Alertas Críticos</CardTitle>
            <CardDescription>
              Cláusulas que requerem atenção imediata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {criticalAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 border border-orange-200 bg-orange-50 rounded-lg"
              >
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-legal-900 text-sm">
                    {alert.document}
                  </h4>
                  <p className="text-sm text-legal-600 mt-1">{alert.clause}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      variant={alert.severity === "Alta" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-legal-500">{alert.date}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Ver todos os alertas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
