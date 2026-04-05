import { FormData } from '@/app/lib/types';

export const STORAGE_KEY = 'event_organizer_form';
export const STEP_KEY = 'event_organizer_step';

export const EMPTY_DEFAULTS: FormData = {
  name: '',
  eventType: '',
  startDate: '',
  endDate: '',
  location: '',
  venue: '',
  category: '',
  budget: undefined,
  guestCount: '',
  servicesNeeded: '',
  genre: '',
  performanceDuration: undefined,
  equipmentProvided: '',
  roleType: '',
  shiftHours: undefined,
  experienceRequired: '',
  specialInstructions: '',
};

/* Remove all persisted form state from localStorage. */
export function clearSavedForm(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
  } catch { /* ignore */ }
}
