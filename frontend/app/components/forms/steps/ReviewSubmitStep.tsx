"use client"
import { useFormContext } from 'react-hook-form';
import { FormData } from '@/app/lib/types';
import { AlertCircle } from 'lucide-react';
import { useFormStep } from '../context/FormStepContext';

export default function ReviewSubmitStep() {
  const { getValues } = useFormContext<FormData>();
  const { errorStatus } = useFormStep();
  const data = getValues();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Review & Submit</h3>

      {errorStatus && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-start gap-3 text-sm font-medium border border-red-100">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p>{errorStatus}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Event Basics</h4>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div><span className="text-gray-500 block">Name</span> <span className="font-medium">{data.name}</span></div>
            <div><span className="text-gray-500 block">Type</span> <span className="font-medium">{data.eventType}</span></div>
            <div><span className="text-gray-500 block">Start Date</span> <span className="font-medium">{data.startDate}</span></div>
            {data.endDate && <div><span className="text-gray-500 block">End Date</span> <span className="font-medium">{data.endDate}</span></div>}
            <div><span className="text-gray-500 block">Location</span> <span className="font-medium">{data.location}</span></div>
            {data.venue && <div><span className="text-gray-500 block">Venue</span> <span className="font-medium">{data.venue}</span></div>}
          </div>
        </div>

        <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Category: {data.category}</h4>
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            {data.category === 'Event Planner' && (
              <>
                {data.budget != null && (
                  <div><span className="text-blue-500 block">Budget</span> <span className="font-medium">${data.budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                )}
                {data.guestCount && <div><span className="text-blue-500 block">Guest Count</span> <span className="font-medium">{data.guestCount}</span></div>}
                {data.servicesNeeded && <div className="col-span-2"><span className="text-blue-500 block">ServicesNeeded</span> <span className="font-medium">{data.servicesNeeded}</span></div>}
              </>
            )}
            {data.category === 'Performer' && (
              <>
                {data.genre && <div><span className="text-blue-500 block">Genre</span> <span className="font-medium">{data.genre}</span></div>}
                {data.performanceDuration && <div><span className="text-blue-500 block">Duration</span> <span className="font-medium">{data.performanceDuration}</span></div>}
                {data.equipmentProvided && <div className="col-span-2"><span className="text-blue-500 block">Equipment Provided</span> <span className="font-medium">{data.equipmentProvided}</span></div>}
              </>
            )}
            {data.category === 'Crew' && (
              <>
                {data.roleType && <div><span className="text-blue-500 block">Role Type</span> <span className="font-medium">{data.roleType}</span></div>}
                {data.shiftHours && <div><span className="text-blue-500 block">Shift Hours</span> <span className="font-medium">{data.shiftHours}</span></div>}
                {data.experienceRequired && <div className="col-span-2"><span className="text-blue-500 block">Required Experience</span> <span className="font-medium">{data.experienceRequired}</span></div>}
              </>
            )}
          </div>
        </div>

        {data.specialInstructions && (
           <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 text-sm">
             <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Instructions</h4>
             <p className="text-gray-700">{data.specialInstructions}</p>
           </div>
        )}
      </div>
      
      <p className="text-xs text-center text-gray-400 pt-4">By submitting, you agree to our terms and conditions.</p>
    </div>
  );
}
