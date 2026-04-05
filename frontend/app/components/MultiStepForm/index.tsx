'use client';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormData } from '@/app/lib/types';
import Step1Basics from './Step1Basics';
import Step2Category from './Step2Category';
import Step3Additional from './Step3Additional';
import Step4Submit from './Step4Submit';
import { submitRequirement } from '@/app/lib/api';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');
  
  const methods = useForm<FormData>({
    defaultValues: {
      name: '', eventType: '', startDate: '', endDate: '', location: '', venue: '', category: '',
      budget: '', guestCount: '', servicesNeeded: '',
      genre: '', performanceDuration: undefined, equipmentProvided: '',
      roleType: '', shiftHours: undefined, experienceRequired: '',
      specialInstructions: ''
    }
  });

  const { trigger, getValues, watch } = methods;

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
        // Enforce category selection before passing step 1
        if (step === 1 && !watch('category')) {
          methods.setError('category', { type: 'manual', message: 'Category is required' });
          return;
        }
        setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const onSubmitForm = async () => {
    const isFormValid = await trigger();
    if (!isFormValid) {
      setErrorStatus('Please fill all required fields in earlier steps.');
      return;
    }
    const data = getValues();
    setIsSubmitting(true);
    setErrorStatus('');
    try {
      const specificFields: any = {};
      
      if (data.category === 'Event Planner') {
        specificFields.budget = data.budget;
        specificFields.guestCount = data.guestCount;
        specificFields.servicesNeeded = data.servicesNeeded;
      } else if (data.category === 'Performer') {
        specificFields.genre = data.genre;
        specificFields.performanceDuration = data.performanceDuration;
        specificFields.equipmentProvided = data.equipmentProvided;
      } else if (data.category === 'Crew') {
        specificFields.roleType = data.roleType;
        specificFields.shiftHours = data.shiftHours;
        specificFields.experienceRequired = data.experienceRequired;
      }
      specificFields.specialInstructions = data.specialInstructions;

      const payload = {
        name: data.name,
        eventType: data.eventType,
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
        venue: data.venue,
        category: data.category,
        specificFields
      };

      await submitRequirement(payload);
      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorStatus(err?.response?.data?.message || err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-lg border border-gray-100 w-full">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Success!</h2>
        <p className="text-gray-600">Your requirement has been posted successfully.</p>
        <button onClick={() => window.location.reload()} className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Post Another</button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['Basics', 'Specifics', 'Additional', 'Review'].map((label, index) => (
            <div key={index} className={`w-1/4 text-center pb-3 border-b-4 font-semibold text-xs sm:text-sm transition-colors ${step >= index + 1 ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-400'}`}>
              <span className="hidden sm:inline">Step {index + 1}: </span>{label}
            </div>
          ))}
        </div>
      </div>

      <FormProvider {...methods}>
        <div className="min-h-[300px]">
          {step === 1 && <Step1Basics />}
          {step === 2 && <Step2Category category={watch('category')} />}
          {step === 3 && <Step3Additional />}
          {step === 4 && <Step4Submit data={getValues()} errorStatus={errorStatus} />}
        </div>
      </FormProvider>

      <div className="mt-10 flex justify-between border-t pt-6 border-gray-100">
        {step > 1 && step < 5 ? (
          <button type="button" onClick={handleBack} disabled={isSubmitting} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50">
            Back
          </button>
        ) : <div />}
        {step < 4 ? (
          <button type="button" onClick={handleNext} className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md shadow-blue-500/30">
            Next Step
          </button>
        ) : (
          <button type="button" onClick={onSubmitForm} disabled={isSubmitting} className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center min-w-[140px] shadow-md shadow-green-500/30">
            {isSubmitting ? 'Submitting...' : 'Submit Post'}
          </button>
        )}
      </div>
    </div>
  );
}
