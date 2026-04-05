'use client';
import { Requirement } from '@/app/lib/types';
import { CalendarDays, MapPin, Tag, Briefcase, Music, LayoutList, Clock, Users, DollarSign } from 'lucide-react';

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'Event Planner': {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    icon: <LayoutList size={14} />,
  },
  Performer: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    icon: <Music size={14} />,
  },
  Crew: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    icon: <Briefcase size={14} />,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

interface RequirementCardProps {
  requirement: Requirement;
}

export default function RequirementCard({ requirement }: RequirementCardProps) {
  const cat = CATEGORY_STYLES[requirement.category] ?? CATEGORY_STYLES['Crew'];
  const sf = requirement.specificFields ?? {};

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 pb-4 flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">{requirement.name}</h2>
          <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cat.bg} ${cat.text} ${cat.border}`}>
            {cat.icon}
            {requirement.category}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Tag size={13} className="text-gray-400" />
            {requirement.eventType}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-gray-400" />
            {requirement.location}
            {requirement.venue && <span className="text-gray-400">· {requirement.venue}</span>}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} className="text-gray-400" />
            {formatDate(requirement.startDate)}
            {requirement.endDate && <span> – {formatDate(requirement.endDate)}</span>}
          </span>
        </div>

        {/* Specific fields */}
        {Object.keys(sf).length > 0 && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {sf.budget != null && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <DollarSign size={13} className="text-green-500 shrink-0" />
                <span className="font-medium">Budget:</span>&nbsp;
                ${Number(sf.budget).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            )}
            {sf.guestCount && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users size={13} className="text-blue-500 shrink-0" />
                <span className="font-medium">Guests:</span>&nbsp;{sf.guestCount}
              </div>
            )}
            {sf.genre && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Music size={13} className="text-orange-500 shrink-0" />
                <span className="font-medium">Genre:</span>&nbsp;{sf.genre}
              </div>
            )}
            {sf.performanceDuration && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock size={13} className="text-orange-400 shrink-0" />
                <span className="font-medium">Duration:</span>&nbsp;{sf.performanceDuration}h
              </div>
            )}
            {sf.roleType && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Briefcase size={13} className="text-sky-500 shrink-0" />
                <span className="font-medium">Role:</span>&nbsp;{sf.roleType}
              </div>
            )}
            {sf.shiftHours && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock size={13} className="text-sky-400 shrink-0" />
                <span className="font-medium">Shift:</span>&nbsp;{sf.shiftHours}h
              </div>
            )}
            {sf.servicesNeeded && (
              <div className="col-span-2 text-gray-600 line-clamp-2">
                <span className="font-medium">Services:</span>&nbsp;{sf.servicesNeeded}
              </div>
            )}
            {sf.equipmentProvided && (
              <div className="col-span-2 text-gray-600 line-clamp-2">
                <span className="font-medium">Equipment:</span>&nbsp;{sf.equipmentProvided}
              </div>
            )}
            {sf.experienceRequired && (
              <div className="col-span-2 text-gray-600 line-clamp-2">
                <span className="font-medium">Experience:</span>&nbsp;{sf.experienceRequired}
              </div>
            )}
            {sf.specialInstructions && (
              <div className="col-span-2 text-gray-600 line-clamp-2 mt-1 pt-2 border-t border-gray-100">
                <span className="font-medium">Notes:</span>&nbsp;{sf.specialInstructions}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
        Posted {formatDate(requirement.createdAt)}
      </div>
    </article>
  );
}
