import { STATES, STATUSES } from '../constants';

const STATE_OPTIONS = ['All', ...STATES];

export default function Filters({ state, onStateChange, status, onStatusChange, search, onSearchChange }) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div role="group" aria-label="Filter by state" className="flex flex-wrap gap-2">
        {STATE_OPTIONS.map((option) => {
          const isActive = state === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onStateChange(option)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-brand-600 hover:text-brand-700'
              }`}
            >
              {option === 'All' ? 'All states' : option}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 lg:ml-auto">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search scholarships…"
          aria-label="Search scholarships"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none lg:w-60"
        />
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
