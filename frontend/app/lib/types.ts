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
  budget?: number;
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

/** Shape of a requirement document returned from the GET API. */
export interface Requirement {
  _id: string;
  name: string;
  eventType: string;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: 'Event Planner' | 'Performer' | 'Crew';
  specificFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
