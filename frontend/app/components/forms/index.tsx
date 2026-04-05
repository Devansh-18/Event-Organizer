'use client';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormData } from '@/app/lib/types';
import { EMPTY_DEFAULTS } from './constants';
import { useFormPersistence } from './hooks/useFormPersistence';
import { useFormSubmit } from './hooks/useFormSubmit';
import { FormStepProvider } from './context/FormStepContext';
import StepIndicator from './ui/StepIndicator';
import FormActions from './ui/FormActions';
import SuccessScreen from './ui/SuccessScreen';
import EventBasicsStep from './steps/EventBasicsStep';
import CategoryDetailsStep from './steps/CategoryDetailsStep';
import AdditionalInfoStep from './steps/AdditionalInfoStep';
import ReviewSubmitStep from './steps/ReviewSubmitStep';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormData>({ defaultValues: EMPTY_DEFAULTS });
  const { trigger, getValues, watch, reset } = methods;

  // Persist draft to localStorage and restore on mount.
  useFormPersistence({ watch, reset, step, setStep });

  // Submission state and handler.
  const { isSubmitting, submitSuccess, errorStatus, onSubmitForm } = useFormSubmit({ trigger, getValues });

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ['name', 'eventType', 'startDate', 'endDate', 'location', 'category'];
    } else if (step === 2) {
      const cat = watch('category');
      if (cat === 'Event Planner') fieldsToValidate = ['budget', 'guestCount', 'servicesNeeded'];
      if (cat === 'Performer') fieldsToValidate = ['genre', 'performanceDuration', 'equipmentProvided'];
      if (cat === 'Crew') fieldsToValidate = ['roleType', 'shiftHours', 'experienceRequired'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      if (step === 1 && !watch('category')) {
        methods.setError('category', { type: 'manual', message: 'Category is required' });
        return;
      }
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  if (submitSuccess) {
    return <SuccessScreen />;
  }

  return (
    <FormStepProvider value={{ step, isSubmitting, errorStatus, onNext: handleNext, onBack: handleBack, onSubmit: onSubmitForm }}>
      <div className="w-full bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        <StepIndicator />

        <FormProvider {...methods}>
          <div className="min-h-75">
            {step === 1 && <EventBasicsStep />}
            {step === 2 && <CategoryDetailsStep />}
            {step === 3 && <AdditionalInfoStep />}
            {step === 4 && <ReviewSubmitStep />}
          </div>
        </FormProvider>

        <FormActions />
      </div>
    </FormStepProvider>
  );
}
