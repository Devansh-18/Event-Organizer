export type CategoryType = 'Event Planner' | 'Performer' | 'Crew' | '';

export interface FormData {
  name: string;
  eventType: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: CategoryType;
  
  // Planner
  budget?: string;
  guestCount?: string;
  servicesNeeded?: string;
  // Performer
  genre?: string;
  performanceDuration?: number;
  equipmentProvided?: string;
  // Crew
  roleType?: string;
  shiftHours?: number;
  experienceRequired?: string;
  
  specialInstructions?: string;
}
