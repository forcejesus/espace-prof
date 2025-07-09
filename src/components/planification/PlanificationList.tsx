import { PlanificationCard } from "./PlanificationCard";

interface PlanificationListProps {
  planifications: any[];
  onStartLiveSession: (plan: any) => void;
}

export function PlanificationList({ planifications, onStartLiveSession }: PlanificationListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {planifications.map((plan, index) => (
        <PlanificationCard
          key={plan._id}
          plan={plan}
          index={index}
          onStartLiveSession={onStartLiveSession}
        />
      ))}
    </div>
  );
}