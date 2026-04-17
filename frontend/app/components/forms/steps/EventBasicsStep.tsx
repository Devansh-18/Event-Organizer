"use client"
import { useFormContext } from 'react-hook-form';
import { FormData } from '@/app/lib/types';
import { Calendar, MapPin, Tag, Type } from 'lucide-react';

export default function Step1Basics() {
  const { register, getValues, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Event Basics</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Type size={16} className="text-blue-500" /> Event Name *
        </label>
        {/* note that in all input, it does not re-renders component again and again as it uses ref instead of states. Also we can see real time values beacause react hook form uses values directly from the input field values parameter and not state. */}
        <input 
          {...register('name', { required: 'Event Name is required' })}
          className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
          placeholder="e.g. Summer Music Festival"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Tag size={16} className="text-blue-500" /> Event Type *
          </label>
          <select 
            {...register('eventType', { required: 'Event Type is required' })}
            className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm appearance-none bg-white text-gray-900 ${errors.eventType ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
          >
            <option value="">Select Type</option>
            <option value="Corporate">Corporate Event</option>
            <option value="Wedding">Wedding</option>
            <option value="Concert">Concert/Festival</option>
            <option value="Private Party">Private Party</option>
            <option value="Other">Other</option>
          </select>
          {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" /> Location (City) *
          </label>
          <input 
            {...register('location', { required: 'Location is required' })}
            className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm text-gray-900 ${errors.location ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
            placeholder="e.g. New York City"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" /> Start Date *
          </label>
          <input 
            type="date"
            {...register('startDate', { 
              required: 'Start Date is required',
              validate: (value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // now only date remains and hours, min, etc. are set to 0, i.e., midnight.
                // Due to timezone offsets when creating a date from string, let's compare simple YYYY-MM-DD
                const todayStr = today.toISOString().split('T')[0]; // date is in form yyyy-mm-ddT.... so split from T and get the first element of splitted array which is date only.
                if (value < todayStr) return 'Start date cannot be in the past';
                return true;
              }
            })}
            className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm bg-white text-gray-900 ${errors.startDate ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
          />
          {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" /> End Date (Optional)
          </label>
          <input 
            type="date"
            {...register('endDate', {
              validate: (value) => {
                if (!value) return true;
                const startDate = getValues('startDate');
                if (startDate && new Date(value) < new Date(startDate)) {
                  return 'End date cannot be earlier than start date';
                }
                return true;
              }
            })}
            className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm bg-white text-gray-900 ${errors.endDate ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
          />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message as string}</p>}
        </div>
      </div>

      <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            Venue (Optional)
          </label>
          <input 
            {...register('venue')}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
            placeholder="e.g. Madison Square Garden"
          />
        </div>


      <div className="pt-4 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-900 block mb-4">What category are you hiring for? *</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Event Planner', 'Performer', 'Crew'].map((cat) => (
            <label key={cat} className="relative flex cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600 has-checked:bg-blue-50/50 transition-all hover:border-blue-300">
              <input type="radio" {...register('category', { required: 'Please select a category to proceed' })} value={cat} className="sr-only" />
              <div className="flex w-full items-center justify-between">
                <span className="font-semibold text-gray-900">{cat}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category.message as string}</p>}
      </div>
    </div>
  );
}
