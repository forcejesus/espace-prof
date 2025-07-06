import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AnswerEditorProps {
  editData: any;
  setEditData: (data: any) => void;
  onSave: () => void;
  onCancel: () => void;
  abstractType: string;
}

export function AnswerEditor({ 
  editData, 
  setEditData, 
  onSave, 
  onCancel, 
  abstractType 
}: AnswerEditorProps) {
  return (
    <div className="flex items-center space-x-4 flex-1">
      <Input
        value={editData.reponse_texte}
        onChange={(e) => setEditData({ ...editData, reponse_texte: e.target.value })}
        className="flex-1"
        readOnly={abstractType === "VRAI_FAUX"}
      />
      
      {abstractType !== "REPONSE_COURTE" && (
        <label className="flex items-center space-x-2">
          {abstractType === "VRAI_FAUX" || abstractType === "CHOIX_UNIQUE" ? (
            <input
              type="radio"
              checked={editData.etat}
              onChange={(e) => setEditData({ ...editData, etat: e.target.checked })}
            />
          ) : (
            <input
              type="checkbox"
              checked={editData.etat}
              onChange={(e) => setEditData({ ...editData, etat: e.target.checked })}
            />
          )}
          <span className="text-sm">Correcte</span>
        </label>
      )}
      
      <div className="flex space-x-1">
        <Button
          size="sm"
          onClick={onSave}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Save className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}