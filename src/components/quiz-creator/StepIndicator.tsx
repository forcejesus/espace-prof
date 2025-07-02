
interface Step {
  number: number;
  title: string;
  completed: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  : "bg-orange-200 text-orange-600"
              }`}
            >
              {step.completed ? "✓" : step.number}
            </div>
            <span
              className={`font-medium ${
                currentStep >= step.number ? "text-orange-900" : "text-orange-600"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 bg-orange-200 mx-4" />
          )}
        </div>
      ))}
    </div>
  );
}
