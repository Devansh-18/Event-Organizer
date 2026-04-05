"use client"
import { useFormContext } from 'react-hook-form';
import { CategoryType, FormData } from '@/app/lib/types';
import { Users, DollarSign, Clock, Briefcase, Music, LayoutList } from 'lucide-react';

export default function CategoryDetailsStep() {
  const { register, watch, formState: { errors } } = useFormContext<FormData>();
  const category = watch('category') as CategoryType;

  if (!category) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        {category === 'Event Planner' && <LayoutList className="text-blue-600" />}
        {category === 'Performer' && <Music className="text-blue-600" />}
        {category === 'Crew' && <Briefcase className="text-blue-600" />}
        {category} Details
      </h3>

      {category === 'Event Planner' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" /> Estimated Budget ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('budget', {
                  required: 'Budget is required',
                  valueAsNumber: true,
                  min: { value: 0.01, message: 'Budget must be greater than 0' },
                })}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm ${errors.budget ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                placeholder="e.g. 5000"
              />
              {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message as string}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users size={16} className="text-blue-500" /> Expected Guest Count
              </label>
              <input 
                type="number"
                {...register('guestCount', { required: 'Guest Count is required', min: { value: 1, message: 'Must be at least 1' } })}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm ${errors.guestCount ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                placeholder="e.g. 150"
              />
              {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount.message as string}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Services Needed</label>
            <textarea 
              {...register('servicesNeeded', { required: 'Services needed is required' })}
              className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm h-28 resize-none ${errors.servicesNeeded ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
              placeholder="e.g. Catering, Decorations, Security..."
            />
            {errors.servicesNeeded && <p className="text-red-500 text-xs mt-1">{errors.servicesNeeded.message as string}</p>}
          </div>
        </div>
      )}

      {category === 'Performer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Genre / Style</label>
              <input 
                {...register('genre', { required: 'Genre is required' })}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm ${errors.genre ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                placeholder="e.g. Jazz Band, Stand-up Comedy"
              />
              {errors.genre && <p className="text-red-500 text-xs mt-1">{errors.genre.message as string}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-orange-500" /> Performance Duration (Hours)
              </label>
              <input 
                type="number"
                {...register('performanceDuration', { required: 'Duration is required', valueAsNumber: true, min: { value: 1, message: 'Must be at least 1 hour' } })}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm ${errors.performanceDuration ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                placeholder="e.g. 2"
              />
              {errors.performanceDuration && <p className="text-red-500 text-xs mt-1">{errors.performanceDuration.message as string}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Equipment Provided</label>
            <textarea 
              {...register('equipmentProvided', { required: 'Please specify equipment or none' })}
              className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm h-28 resize-none ${errors.equipmentProvided ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
              placeholder="e.g. PA System, Mics, Stage Lighting... or state 'None'"
            />
            {errors.equipmentProvided && <p className="text-red-500 text-xs mt-1">{errors.equipmentProvided.message as string}</p>}
          </div>
        </div>
      )}

      {category === 'Crew' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Role Type</label>
              <input 
                {...register('roleType', { required: 'Role Type is required' })}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm ${errors.roleType ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                placeholder="e.g. Lighting Tech, Stagehand, Security"
              />
              {errors.roleType && <p className="text-red-500 text-xs mt-1">{errors.roleType.message as string}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-orange-500" /> Shift Hours
              </label>
              <input 
                type="number"
                {...register('shiftHours', { required: 'Shift Hours is required', valueAsNumber: true, min: { value: 1, message: 'Must be at least 1 hour' } })}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm ${errors.shiftHours ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                placeholder="e.g. 8"
              />
              {errors.shiftHours && <p className="text-red-500 text-xs mt-1">{errors.shiftHours.message as string}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Experience Required</label>
            <textarea 
              {...register('experienceRequired', { required: 'Experience requirement is required' })}
              className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm h-28 resize-none ${errors.experienceRequired ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
              placeholder="e.g. 2+ years of sound engineering."
            />
            {errors.experienceRequired && <p className="text-red-500 text-xs mt-1">{errors.experienceRequired.message as string}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
