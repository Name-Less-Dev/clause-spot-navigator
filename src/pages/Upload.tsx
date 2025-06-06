
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload as UploadIcon, FileText, Cloud, HardDrive, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === "application/pdf");
    
    if (pdfFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...pdfFiles]);
      toast({
        title: "Arquivos adicionados",
        description: `${pdfFiles.length} arquivo(s) PDF adicionado(s) com sucesso.`,
      });
    } else {
      toast({
        title: "Formato inválido",
        description: "Apenas arquivos PDF são aceitos.",
        variant: "destructive",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const pdfFiles = files.filter(file => file.type === "application/pdf");
    
    if (pdfFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...pdfFiles]);
      toast({
        title: "Arquivos selecionados",
        description: `${pdfFiles.length} arquivo(s) PDF selecionado(s).`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Nenhum arquivo",
        description: "Selecione pelo menos um arquivo para upload.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Upload iniciado",
      description: `Processando ${uploadedFiles.length} arquivo(s)...`,
    });
    
    // Simular processamento
    setTimeout(() => {
      setUploadedFiles([]);
      toast({
        title: "Upload concluído",
        description: "Documentos enviados e análise iniciada com sucesso.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-legal-900">Upload de Documentos</h1>
        <p className="text-legal-600 mt-2">
          Envie seus documentos jurídicos para análise inteligente
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Área de Upload */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-legal-200">
            <CardHeader>
              <CardTitle className="text-legal-900">Enviar Documentos</CardTitle>
              <CardDescription>
                Arraste arquivos PDF ou clique para selecionar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-legal-400 bg-legal-50"
                    : "border-legal-300 hover:border-legal-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="mx-auto h-12 w-12 text-legal-400 mb-4" />
                <h3 className="text-lg font-medium text-legal-900 mb-2">
                  Arraste seus arquivos aqui
                </h3>
                <p className="text-legal-600 mb-4">
                  ou clique no botão abaixo para selecionar
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Selecionar Arquivos
                  </Button>
                </Label>
                <p className="text-xs text-legal-500 mt-2">
                  Apenas arquivos PDF são aceitos
                </p>
              </div>

              {/* Lista de arquivos */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-legal-900">Arquivos Selecionados</h4>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-legal-50 rounded-lg border border-legal-200"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-legal-600" />
                        <div>
                          <p className="text-sm font-medium text-legal-900">
                            {file.name}
                          </p>
                          <p className="text-xs text-legal-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-legal-500 hover:text-legal-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Integrações */}
          <Card className="border-legal-200">
            <CardHeader>
              <CardTitle className="text-legal-900">Importar de Nuvem</CardTitle>
              <CardDescription>
                Conecte-se aos seus serviços de armazenamento
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2">
                <Cloud className="h-6 w-6" />
                Google Drive
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <HardDrive className="h-6 w-6" />
                OneDrive
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-6">
          <Card className="border-legal-200">
            <CardHeader>
              <CardTitle className="text-legal-900">Informações do Caso</CardTitle>
              <CardDescription>
                Dados opcionais para organização
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="case-name">Nome do Caso</Label>
                <Input
                  id="case-name"
                  placeholder="Ex: Contrato ABC Corp"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Ex: contrato, prestação, serviços"
                  className="mt-1"
                />
                <p className="text-xs text-legal-500 mt-1">
                  Separe as tags com vírgulas
                </p>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição opcional do documento..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Prioridade</Label>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-legal-200">
                    Baixa
                  </Badge>
                  <Badge variant="default" className="cursor-pointer">
                    Normal
                  </Badge>
                  <Badge variant="destructive" className="cursor-pointer">
                    Alta
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSubmit}
            className="w-full legal-gradient text-white hover:opacity-90"
            size="lg"
          >
            Iniciar Análise
          </Button>

          <Card className="border-legal-200">
            <CardContent className="pt-6">
              <h4 className="font-medium text-legal-900 mb-2">Dicas Importantes</h4>
              <ul className="text-sm text-legal-600 space-y-1">
                <li>• Arquivos até 50MB são aceitos</li>
                <li>• PDFs com texto são analisados melhor</li>
                <li>• Tags ajudam na organização</li>
                <li>• A análise pode levar alguns minutos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
