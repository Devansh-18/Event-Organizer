import { useFormStep } from '../context/FormStepContext';

const STEP_LABELS = ['Basics', 'Specifics', 'Additional', 'Review'];

/* Displays the horizontal step progress bar at the top of the form. */
export default function StepIndicator() {
  const { step } = useFormStep();
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {STEP_LABELS.map((label, index) => (
          <div
            key={index}
            className={`w-1/4 text-center pb-3 border-b-4 font-semibold text-xs sm:text-sm transition-colors ${
              step >= index + 1 ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-400'
            }`}
          >
            <span className="hidden sm:inline">Step {index + 1}: </span>{label}
          </div>
        ))}
      </div>
    </div>
  );
}
