import { Check } from 'lucide-react';

interface StepLabels {
  label: string;
}

interface ProgressBarProps {
  currentStep: number;
	stepLabels: StepLabels[]
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, stepLabels }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {stepLabels.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isCurrent = index + 1 === currentStep;

        return (
          <div key={index} className="flex items-center space-x-2">
						<div className="relative">
							{/* Circle */}
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
									isCompleted || isCurrent
										? "bg-teal-500 text-white"
										: "bg-gray-200 text-teal-500"
								}`}
							>
								{isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
							</div>

							{/* Label */}
							<span
								className={`text-[9px] absolute -bottom-6 right-1/2 translate-x-1/2 whitespace-nowrap ${
									isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"
								}`}
							>
								{step.label}
							</span>
						</div>

            {/* Line */}
            {index < stepLabels.length - 1 && (
              <div
                className={`w-16 h-1 ${
                  index + 1 < currentStep
                    ? "bg-teal-500"
                    : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
