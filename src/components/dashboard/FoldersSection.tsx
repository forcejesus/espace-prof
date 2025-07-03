import { Plus, MoreHorizontal, BookOpen, Trophy, Star, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FoldersSection() {
  const folders = [
    { name: "Histoire", color: "bg-akili-purple-500", count: 8, icon: BookOpen },
    { name: "Mathématiques", color: "bg-akili-blue-500", count: 12, icon: Trophy },
    { name: "Sciences", color: "bg-akili-green-500", count: 6, icon: Star },
    { name: "Français", color: "bg-akili-orange-500", count: 4, icon: BookOpen },
    { name: "Géographie", color: "bg-akili-teal-500", count: 3, icon: Target },
    { name: "Arts", color: "bg-akili-yellow-500", count: 2, icon: Star }
  ];

  return (
    <div className="space-y-s20">
      <div className="flex items-center justify-between">
        <h2 className="text-h3-bold text-akili-grey-800">Dossiers ({folders.length})</h2>
        <Button variant="link" className="text-akili-green-500 p-0 font-akili-bold">
          <Plus className="w-4 h-4 mr-s8" />
          Créer nouveau
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-s20">
        {folders.map((folder, index) => (
          <Card key={index} className="bg-white hover:shadow-akili-lg transition-all duration-fast cursor-pointer border-0 shadow-akili-md transform hover:-translate-y-1">
            <CardContent className="p-s20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-s12">
                  <div className={`w-10 h-10 rounded-akili-lg ${folder.color} flex items-center justify-center shadow-akili-sm`}>
                    <folder.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-akili-bold text-akili-grey-800">{folder.name}</span>
                    <p className="text-body4-medium text-akili-grey-600">{folder.count} jeux</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-1">
                  <MoreHorizontal className="w-4 h-4 text-akili-grey-600" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}