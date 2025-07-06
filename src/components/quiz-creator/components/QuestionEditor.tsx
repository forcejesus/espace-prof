import { Save, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreatedQuestion } from "../utils/questionTypeUtils";

interface QuestionEditorProps {
  question: CreatedQuestion;
  editData: any;
  setEditData: (data: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function QuestionEditor({ 
  question, 
  editData, 
  setEditData, 
  onSave, 
  onCancel 
}: QuestionEditorProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setEditData({ ...editData, fichier: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Question
        </label>
        <Textarea
          value={editData.libelle}
          onChange={(e) => setEditData({ ...editData, libelle: e.target.value })}
          className="border-blue-200 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temps (secondes)
          </label>
          <Input
            type="number"
            value={editData.temps}
            onChange={(e) => setEditData({ ...editData, temps: parseInt(e.target.value) })}
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image (optionnelle)
          </label>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border-blue-200 focus:border-blue-500"
            />
            <Image className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={onSave}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
        >
          <X className="w-4 h-4 mr-2" />
          Annuler
        </Button>
      </div>
    </div>
  );
}