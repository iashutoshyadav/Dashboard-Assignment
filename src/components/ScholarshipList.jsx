import StatusSelect from './StatusSelect';
import { formatDeadline } from '../utils/date';

function ActionButtons({ scholarship, onEdit, onPreview }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onEdit(scholarship)}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => onPreview(scholarship)}
        className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-100"
      >
        Preview
      </button>
    </div>
  );
}

export default function ScholarshipList({ scholarships, onStatusChange, onEdit, onPreview }) {
  if (scholarships.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <p className="font-medium text-slate-800">No scholarships match these filters</p>
        <p className="mt-1 text-sm text-slate-500">Try another state, status or search term.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-700 text-xs tracking-wide text-white uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Scholarship</th>
              <th scope="col" className="px-4 py-3 font-semibold">State</th>
              <th scope="col" className="px-4 py-3 font-semibold">Class</th>
              <th scope="col" className="px-4 py-3 font-semibold">Deadline</th>
              <th scope="col" className="px-4 py-3 font-semibold">Status</th>
              <th scope="col" className="px-4 py-3 font-semibold">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scholarships.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{s.name}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{s.provider}</p>
                </td>
                <td className="px-4 py-3 text-slate-700">{s.state}</td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-700">{s.applicableClass}</td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-700">{formatDeadline(s.deadline)}</td>
                <td className="px-4 py-3">
                  <StatusSelect scholarship={s} onChange={onStatusChange} />
                </td>
                <td className="px-4 py-3">
                  <ActionButtons scholarship={s} onEdit={onEdit} onPreview={onPreview} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="space-y-3 md:hidden">
        {scholarships.map((s) => (
          <li key={s.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{s.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{s.provider}</p>
              </div>
              <StatusSelect scholarship={s} onChange={onStatusChange} />
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <dt className="text-slate-500">State</dt>
                <dd className="font-medium text-slate-800">{s.state}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Class</dt>
                <dd className="font-medium text-slate-800">{s.applicableClass}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Deadline</dt>
                <dd className="font-medium text-slate-800">{formatDeadline(s.deadline)}</dd>
              </div>
            </dl>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <ActionButtons scholarship={s} onEdit={onEdit} onPreview={onPreview} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
