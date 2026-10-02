import { STATUS_STYLES } from '../constants';

const CARDS = [
  { key: 'All', label: 'Total Scholarships', style: 'bg-brand-50 border-brand-100', active: 'ring-2 ring-brand-600' },
  { key: 'Published', label: 'Published' },
  { key: 'Draft', label: 'Draft' },
  { key: 'Expired', label: 'Expired' },
];

export default function SummaryCards({ counts, activeStatus, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {CARDS.map((card) => {
        const style = card.style ?? STATUS_STYLES[card.key].card;
        const active = card.active ?? STATUS_STYLES[card.key].activeCard;
        const isActive = activeStatus === card.key;
        return (
          <button
            key={card.key}
            type="button"
            onClick={() => onSelect(card.key)}
            aria-pressed={isActive}
            className={`rounded-xl border p-4 text-left transition hover:shadow-sm ${style} ${isActive ? active : ''}`}
          >
            <p className="text-sm text-slate-600">{card.label}</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{counts[card.key]}</p>
          </button>
        );
      })}
    </div>
  );
}
