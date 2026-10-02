import { daysUntil, formatDeadline } from '../utils/date';

function deadlineNote(deadline) {
  const days = daysUntil(deadline);
  if (days === null) return null;
  if (days < 0) return { text: 'Deadline passed', className: 'text-rose-600' };
  if (days === 0) return { text: 'Closes today', className: 'text-rose-600' };
  if (days <= 30) return { text: `${days} day${days === 1 ? '' : 's'} left`, className: 'text-amber-600' };
  return { text: `${days} days left`, className: 'text-emerald-600' };
}

const STATUS_NOTICE = {
  Draft: 'This scholarship is a Draft. Students will not see it until it is Published.',
  Expired: 'This scholarship is Expired. Students will see it as closed.',
};

export default function StudentPreviewCard({ scholarship }) {
  const isOpen = scholarship.status === 'Published';
  const note = deadlineNote(scholarship.deadline);

  return (
    <div className="space-y-4">
      {STATUS_NOTICE[scholarship.status] && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {STATUS_NOTICE[scholarship.status]}
        </p>
      )}

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-brand-700 to-brand-600 px-5 py-4 text-white">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5">{scholarship.state || 'State'}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-0.5">{scholarship.applicableClass || 'Class'}</span>
          </div>
          <h3 className="mt-2 text-lg leading-snug font-semibold">{scholarship.name || 'Scholarship name'}</h3>
          <p className="mt-0.5 text-sm text-brand-100">{scholarship.provider || 'Provider name'}</p>
        </div>

        <div className="space-y-4 p-5 text-sm">
          <section>
            <h4 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Benefit</h4>
            <p className="mt-1 text-slate-800">{scholarship.benefit || '—'}</p>
          </section>
          <section>
            <h4 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Who can apply</h4>
            <p className="mt-1 text-slate-800">{scholarship.eligibility || '—'}</p>
          </section>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-500">Last date to apply</p>
              <p className="font-semibold text-slate-900">
                {formatDeadline(scholarship.deadline)}
                {note && <span className={`ml-2 text-xs font-medium ${note.className}`}>{note.text}</span>}
              </p>
            </div>
            {isOpen && scholarship.link ? (
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand-700 px-5 py-2.5 text-center font-medium text-white hover:bg-brand-800"
              >
                Apply now ↗
              </a>
            ) : (
              <span className="rounded-lg bg-slate-100 px-5 py-2.5 text-center font-medium text-slate-500">
                {scholarship.status === 'Expired' ? 'Applications closed' : 'Not yet open'}
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
