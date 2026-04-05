import { useFormStep } from '../context/FormStepContext';

/* Renders the Back / Next Step / Submit Post navigation buttons. */
export default function FormActions() {
  const { step, isSubmitting, onBack, onNext, onSubmit } = useFormStep();
  return (
    <div className="mt-10 flex justify-between border-t pt-6 border-gray-100">
      {step > 1 && step < 5 ? (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          Back
        </button>
      ) : (
        <div />
      )}

      {step < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md shadow-blue-500/30"
        >
          Next Step
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center min-w-35 shadow-md shadow-green-500/30"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Post'}
        </button>
      )}
    </div>
  );
}
