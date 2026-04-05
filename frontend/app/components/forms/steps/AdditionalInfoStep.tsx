"use client"
import { useFormContext } from 'react-hook-form';
import { FormData } from '@/app/lib/types';
import { FileText } from 'lucide-react';

export default function Step3Additional() {
  const { register } = useFormContext<FormData>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FileText className="text-blue-600" /> Additional Information
      </h3>

      <div className="space-y-2 relative">
        <label className="text-sm font-medium text-gray-700 block">Special Instructions (Optional)</label>
        <p className="text-xs text-gray-500 mb-2">Any further requirements or details they should know before applying?</p>
        <textarea 
          {...register('specialInstructions')}
          className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm h-40 resize-none"
          placeholder="e.g. Please wear all black. Parking is available at the back of the venue. Bring your own tools..."
        />
      </div>
    </div>
  );
}
