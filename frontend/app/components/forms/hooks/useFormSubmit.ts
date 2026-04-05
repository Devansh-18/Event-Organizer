import { useState } from 'react';
import { UseFormTrigger, UseFormGetValues } from 'react-hook-form';
import { FormData } from '@/app/lib/types';
import { submitRequirement } from '@/app/lib/api';
import { clearSavedForm } from '../constants';

interface UseFormSubmitProps {
  trigger: UseFormTrigger<FormData>;
  getValues: UseFormGetValues<FormData>;
}

interface UseFormSubmitReturn {
  isSubmitting: boolean;
  submitSuccess: boolean;
  errorStatus: string;
  onSubmitForm: () => Promise<void>;
}

/**
 * Handles all submission logic for the multi-step form.
 *
 * - Validates the full form before submitting.
 * - Builds the category-specific payload.
 * - Calls the API and clears localStorage on success.
 * - Exposes state: isSubmitting, submitSuccess, errorStatus.
 */
export function useFormSubmit({ trigger, getValues }: UseFormSubmitProps): UseFormSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');

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
      // Build category-specific fields based on the selected category.
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
        specificFields,
      };

      await submitRequirement(payload);

      // Clear persisted state only after a successful submission.
      clearSavedForm();
      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorStatus(err?.response?.data?.message || err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitSuccess, errorStatus, onSubmitForm };
}
