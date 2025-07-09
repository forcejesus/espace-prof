import { Timer } from "lucide-react";

export function LoadingState() {
  return (
    <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60">
      <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
        <Timer className="w-12 h-12 text-white animate-spin" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Chargement...</h3>
      <p className="text-gray-600">Récupération des planifications</p>
    </div>
  );
}