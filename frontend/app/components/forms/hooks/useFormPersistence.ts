import { useEffect, Dispatch, SetStateAction } from 'react';
import { UseFormWatch, UseFormReset } from 'react-hook-form';
import { FormData } from '@/app/lib/types';
import { STORAGE_KEY, STEP_KEY, EMPTY_DEFAULTS } from '../constants';

interface UseFormPersistenceProps {
  watch: UseFormWatch<FormData>;
  reset: UseFormReset<FormData>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export function useFormPersistence({ watch, reset, step, setStep }: UseFormPersistenceProps): void {
  // ─── Restore saved draft AFTER hydration (client-only)
  // useEffect never runs on the server, so this read is always safe.
  // It fires once after the initial paint, causing one silent re-render.
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem(STEP_KEY);
      const savedForm = localStorage.getItem(STORAGE_KEY);

      if (savedStep) {
        const parsed = parseInt(savedStep, 10); // 10 is passed for decimal conversion of string.
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 4) {
          setStep(parsed);
        }
      }

      if (savedForm) {
        const parsed = JSON.parse(savedForm) as Partial<FormData>; // partial make all properties of form data optional. Good for these type of cases where few fields are to be fetched.
        // converts json string to object.

        reset({ ...EMPTY_DEFAULTS, ...parsed }); // parsed overwrite defaults if that field exists and create another object with data consistency. 
      }
    } catch { /* start fresh */ }
  }, []);

  // Persist form values to localStorage whenever any field changes.
  useEffect(() => {
    // creates subscription for all fields whenever component mounts or watch reference changes(rare). 
    // Watch retrieves latest value of provided field (here all), that user changes instantly just like states.
    // So here, logic runs inside watch not in useEffect logic so useEffect only triggers once here and than watch handles all the logic.
    const subscription = watch((values) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch { /* silently ignore */ }
    });
    // unsubscribe when "COMPONENT UNMOUNT". Watch not listen anymore.
    return () => subscription.unsubscribe();
  }, [watch]);

  // Persist the current step whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(STEP_KEY, String(step));
    } catch { /* ignore */ }
  }, [step]);
}
