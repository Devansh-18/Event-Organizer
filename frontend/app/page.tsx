import MultiStepForm from '@/app/components/forms';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Post a Requirement | EventPost',
  description: 'Post your event planner, performer, or crew requirements smoothly.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sm:px-10 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="EventPost logo" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-bold text-xl text-slate-900">EventPost</span>
          </a>
          <a
            href="/listings"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50"
          >
            Browse Listings
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 hidden sm:block">
              Post Your Requirements
            </h1>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:hidden">
              Post Requirement
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Find the best event planners, performers, and crew members for your next big event in just a few steps.
            </p>
          </div>
          
          <MultiStepForm />
          
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} EventPost. All rights reserved.</p>
      </footer>
    </div>
  );
}
