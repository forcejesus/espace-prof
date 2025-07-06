import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";
export function Analytics() {
  const {
    t
  } = useTranslation();
  const analyticsData = [{
    title: "Taux de Participation",
    value: "87.3%",
    change: "+2.4%",
    isPositive: true,
    color: "bg-akili-green-100",
    textColor: "text-akili-green-700"
  }, {
    title: "Score Moyen",
    value: "76.8",
    change: "+5.2%",
    isPositive: true,
    color: "bg-akili-blue-100",
    textColor: "text-akili-blue-700"
  }, {
    title: "Temps Moyen",
    value: "12m 34s",
    change: "-1.8%",
    isPositive: false,
    color: "bg-akili-orange-100",
    textColor: "text-akili-orange-700"
  }];
  const monthlyData = [{
    month: "Jan",
    value: 65
  }, {
    month: "Fév",
    value: 78
  }, {
    month: "Mar",
    value: 82
  }, {
    month: "Avr",
    value: 75
  }, {
    month: "Mai",
    value: 88
  }, {
    month: "Jun",
    value: 92
  }, {
    month: "Jul",
    value: 85
  }, {
    month: "Aoû",
    value: 89
  }, {
    month: "Sep",
    value: 94
  }, {
    month: "Oct",
    value: 87
  }, {
    month: "Nov",
    value: 91
  }, {
    month: "Déc",
    value: 96
  }];
  return;
}