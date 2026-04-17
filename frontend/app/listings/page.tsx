'use client';
import { useState, useEffect } from 'react';
import { getRequirements } from '@/app/lib/api';
import { Requirement } from '@/app/lib/types';
import RequirementCard from '@/app/components/listings/RequirementCard';
import { LayoutList, Music, Briefcase, Search, Loader2, AlertCircle, InboxIcon } from 'lucide-react';

type FilterCategory = 'All' | 'Event Planner' | 'Performer' | 'Crew';

const CATEGORY_FILTERS: FilterCategory[] = ['All', 'Event Planner', 'Performer', 'Crew'];

const FILTER_ICONS: Record<FilterCategory, React.ReactNode> = {
  "All": null,
  "Event Planner": <LayoutList size={15} />,
  "Performer": <Music size={15} />,
  "Crew": <Briefcase size={15} />,
};

export default function ListingsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const data = await getRequirements();
        setRequirements(data);
      } catch {
        setError('Failed to load requirements. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // don't wait for the execution of this... whenever setReq updates, re-render happens automatically.
    fetchRequirements();
  }, []);

  const filtered = requirements.filter((r) => {
    const matchesCategory = activeFilter === 'All' || r.category === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.eventType.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sm:px-10 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="EventPost logo" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-bold text-xl text-slate-900">EventPost</span>
          </a>
          <a
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50"
          >
            + Post Requirement
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Browse Listings
          </h1>
          <p className="text-gray-500 text-lg">
            {loading ? 'Loading...' : `${filtered.length} requirement${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location or event type…"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition bg-white shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {FILTER_ICONS[cat]}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 size={36} className="animate-spin mb-4" />
            <p className="text-sm font-medium">Fetching requirements…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
            <AlertCircle size={20} className="shrink-0" />
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <InboxIcon size={44} className="mb-4 opacity-40" />
            <p className="font-semibold text-gray-500 text-lg mb-1">No requirements found</p>
            <p className="text-sm">Try adjusting your search or filter.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((req) => (
              <RequirementCard key={req._id} requirement={req} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} EventPost. All rights reserved.
      </footer>
    </div>
  );
}
