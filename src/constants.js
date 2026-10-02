export const STATES = ['Bihar', 'Haryana', 'Jharkhand'];

export const STATUSES = ['Published', 'Draft', 'Expired'];

export const CLASS_SUGGESTIONS = ['Class 1-10', 'Class 1-8', 'Class 9-10', 'Class 11-12'];

// Tailwind classes per status, kept in one place so badges, selects and cards stay consistent.
export const STATUS_STYLES = {
  Published: {
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    dot: 'bg-emerald-500',
    card: 'bg-emerald-50 border-emerald-200',
    activeCard: 'ring-2 ring-emerald-500',
  },
  Draft: {
    badge: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    dot: 'bg-amber-500',
    card: 'bg-amber-50 border-amber-200',
    activeCard: 'ring-2 ring-amber-500',
  },
  Expired: {
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    dot: 'bg-rose-500',
    card: 'bg-rose-50 border-rose-200',
    activeCard: 'ring-2 ring-rose-500',
  },
};

export const EMPTY_SCHOLARSHIP = {
  name: '',
  state: '',
  provider: '',
  applicableClass: '',
  eligibility: '',
  benefit: '',
  deadline: '',
  link: '',
  status: 'Draft',
};
