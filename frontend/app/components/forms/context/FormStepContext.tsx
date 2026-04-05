'use client';
import { createContext, useContext, ReactNode } from 'react';

interface FormStepContextValue {
  step: number;
  isSubmitting: boolean;
  errorStatus: string;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

const FormStepContext = createContext<FormStepContextValue | null>(null);

/** Provides step navigation and submission state to the entire form tree. */
export function FormStepProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: FormStepContextValue;
}) {
  return (
    <FormStepContext.Provider value={value}>
      {children}
    </FormStepContext.Provider>
  );
}

export function useFormStep(): FormStepContextValue {
  const context = useContext(FormStepContext);
  if (!context) {
    throw new Error('useFormStep must be used within a FormStepProvider');
  }
  return context;
}
