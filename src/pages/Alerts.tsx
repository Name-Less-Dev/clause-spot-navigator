
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Plus, Edit, Trash2, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Alerts = () => {
  const [showNewAlert, setShowNewAlert] = useState(false);
  const { toast } = useToast();

  const alertTerms = [
    {
      id: 1,
      term: "cláusula de rescisão",
      description: "Monitora cláusulas relacionadas ao término antecipado de contratos",
      status: "active",
      matches: 12,
      lastTriggered: "2024-06-05",
      priority: "alta",
    },
    {
      id: 2,
      term: "penalidades por atraso",
      description: "Identifica multas e penalidades por descumprimento de prazos",
      status: "active",
      matches: 8,
      lastTriggered: "2024-06-04",
      priority: "média",
    },
    {
      id: 3,
      term: "confidencialidade",
      description: "Monitora cláusulas de sigilo e proteção de informações",
      status: "inactive",
      matches: 15,
      lastTriggered: "2024-06-02",
      priority: "baixa",
    },
    {
      id: 4,
      term: "força maior",
      description: "Detecta cláusulas sobre eventos extraordinários",
      status: "active",
      matches: 5,
      lastTriggered: "2024-06-01",
      priority: "média",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      document: "Contrato ABC Corp",
      term: "cláusula de rescisão",
      clause: "Rescisão por justa causa com aviso de 30 dias",
      timestamp: "2024-06-05 14:30",
      status: "new",
      priority: "alta",
    },
    {
      id: 2,
      document: "Acordo XYZ Ltd",
      term: "penalidades por atraso",
      clause: "Multa de 2% ao mês sobre valor em atraso",
      timestamp: "2024-06-04 09:15",
      status: "reviewed",
      priority: "média",
    },
    {
      id: 3,
      document: "Contrato DEF Inc",
      term: "força maior",
      clause: "Suspensão de obrigações em caso de pandemia",
      timestamp: "2024-06-01 16:45",
      status: "reviewed",
      priority: "baixa",
    },
  ];

  const handleNewAlert = () => {
    toast({
      title: "Alerta criado",
      description: "Novo termo de monitoramento adicionado com sucesso.",
    });
    setShowNewAlert(false);
  };

  const toggleAlertStatus = (id: number) => {
    toast({
      title: "Status atualizado",
      description: "O status do alerta foi alterado.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "bg-red-100 text-red-800";
      case "média": return "bg-yellow-100 text-yellow-800";
      case "baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-legal-900">Alertas Personalizados</h1>
          <p className="text-legal-600 mt-2">
            Configure termos e padrões para monitoramento automático
          </p>
        </div>
        <Button 
          onClick={() => setShowNewAlert(true)}
          className="legal-gradient text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Alerta
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Termos Monitorados */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-legal-200">
            <CardHeader>
              <CardTitle className="text-legal-900">Termos Monitorados</CardTitle>
              <CardDescription>
                Gerencie os termos e padrões que você deseja monitorar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertTerms.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between p-4 border border-legal-200 rounded-lg hover:bg-legal-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-legal-900">
                        "{alert.term}"
                      </h4>
                      <Badge 
                        className={`${getPriorityColor(alert.priority)} border-0 text-xs`}
                      >
                        {alert.priority}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={alert.status === "active"}
                          onCheckedChange={() => toggleAlertStatus(alert.id)}
                        />
                        <span className="text-xs text-legal-500">
                          {alert.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-legal-600 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-legal-500">
                      <span>{alert.matches} correspondências</span>
                      <span>Último disparo: {alert.lastTriggered}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Novo Alerta */}
          {showNewAlert && (
            <Card className="border-legal-200 bg-legal-50">
              <CardHeader>
                <CardTitle className="text-legal-900">Criar Novo Alerta</CardTitle>
                <CardDescription>
                  Configure um novo termo para monitoramento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="alert-term">Termo ou Padrão</Label>
                  <Input
                    id="alert-term"
                    placeholder="Ex: cláusula de garantia"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="alert-description">Descrição</Label>
                  <Textarea
                    id="alert-description"
                    placeholder="Descreva o que este alerta monitora..."
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Prioridade</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="média">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Frequência</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Imediata</SelectItem>
                        <SelectItem value="daily">Diária</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={handleNewAlert} className="legal-gradient text-white">
                    Criar Alerta
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewAlert(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Alertas Recentes */}
        <div>
          <Card className="border-legal-200">
            <CardHeader>
              <CardTitle className="text-legal-900">Alertas Recentes</CardTitle>
              <CardDescription>
                Últimas detecções do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 border border-legal-200 rounded-lg space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {alert.status === "new" ? (
                        <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      )}
                      <Badge 
                        className={`${getPriorityColor(alert.priority)} border-0 text-xs`}
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-legal-500">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm text-legal-900">
                      {alert.document}
                    </h5>
                    <p className="text-xs text-legal-600 mt-1">
                      Termo: "{alert.term}"
                    </p>
                    <p className="text-xs text-legal-700 mt-1 italic">
                      "{alert.clause}"
                    </p>
                  </div>

                  {alert.status === "new" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        Revisar
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        Ignorar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card className="border-legal-200 mt-6">
            <CardHeader>
              <CardTitle className="text-legal-900">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-3 bg-legal-50 rounded-lg">
                <div className="text-2xl font-bold text-legal-900">23</div>
                <div className="text-sm text-legal-600">Alertas ativos</div>
              </div>
              
              <div className="text-center p-3 bg-legal-50 rounded-lg">
                <div className="text-2xl font-bold text-legal-900">156</div>
                <div className="text-sm text-legal-600">Detecções este mês</div>
              </div>
              
              <div className="text-center p-3 bg-legal-50 rounded-lg">
                <div className="text-2xl font-bold text-legal-900">92%</div>
                <div className="text-sm text-legal-600">Precisão média</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
