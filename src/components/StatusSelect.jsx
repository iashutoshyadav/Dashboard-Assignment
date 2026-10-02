import { STATUSES, STATUS_STYLES } from '../constants';

export default function StatusSelect({ scholarship, onChange }) {
  return (
    <select
      value={scholarship.status}
      onChange={(e) => onChange(scholarship.id, e.target.value)}
      aria-label={`Change status for ${scholarship.name}`}
      className={`cursor-pointer rounded-full py-1 pr-7 pl-3 text-xs font-medium ring-1 ring-inset focus:ring-2 focus:ring-brand-600 focus:outline-none ${STATUS_STYLES[scholarship.status].badge}`}
    >
      {STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
