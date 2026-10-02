import { useState } from 'react';
import { CLASS_SUGGESTIONS, EMPTY_SCHOLARSHIP, STATES, STATUSES } from '../constants';
import { validateScholarship } from '../utils/validate';
import StudentPreviewCard from './StudentPreviewCard';

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm focus:ring-2 focus:outline-none ${
    hasError
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
      : 'border-slate-300 focus:border-brand-600 focus:ring-brand-100'
  }`;

function Field({ id, label, required, error, hint, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-600">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}

/**
 * Add / Edit form. Pass `initialValues` to edit an existing scholarship.
 * Errors are shown after a field is touched, and for every field on submit.
 */
export default function ScholarshipForm({ initialValues, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...EMPTY_SCHOLARSHIP, ...initialValues });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const errors = validateScholarship(values);
  const visibleError = (field) => (submitted || touched[field] ? errors[field] : undefined);

  // Shared props for every input so each field is wired the same way.
  const bind = (field) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: (e) => setValues((prev) => ({ ...prev, [field]: e.target.value })),
    onBlur: () => setTouched((prev) => ({ ...prev, [field]: true })),
    'aria-invalid': Boolean(visibleError(field)),
    'aria-describedby': visibleError(field) ? `${field}-error` : undefined,
    className: inputClass(visibleError(field)),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      setShowPreview(false);
      requestAnimationFrame(() => document.getElementById(firstInvalid)?.focus());
      return;
    }
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]),
    );
    onSubmit(trimmed);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-1 border-b border-slate-200 px-5 pt-3">
        {[
          { key: false, label: 'Details' },
          { key: true, label: 'Student preview' },
        ].map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setShowPreview(tab.key)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${
              showPreview === tab.key
                ? 'border-brand-700 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {showPreview ? (
          <StudentPreviewCard scholarship={values} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Scholarship name" required error={visibleError('name')} className="sm:col-span-2">
              <input type="text" autoFocus {...bind('name')} placeholder="e.g. Post-Matric Scholarship for SC Students" />
            </Field>

            <Field id="state" label="State" required error={visibleError('state')}>
              <select {...bind('state')}>
                <option value="">Select state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="applicableClass" label="Applicable class" required error={visibleError('applicableClass')}>
              <input type="text" list="class-suggestions" {...bind('applicableClass')} placeholder="e.g. Class 9-10" />
              <datalist id="class-suggestions">
                {CLASS_SUGGESTIONS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>

            <Field id="provider" label="Provider name" required error={visibleError('provider')} className="sm:col-span-2">
              <input type="text" {...bind('provider')} placeholder="e.g. SC & ST Welfare Department, Govt. of Bihar" />
            </Field>

            <Field id="eligibility" label="Eligibility criteria" required error={visibleError('eligibility')} className="sm:col-span-2">
              <textarea rows={3} {...bind('eligibility')} placeholder="Who can apply: category, class, domicile, income limit…" />
            </Field>

            <Field id="benefit" label="Scholarship amount or benefit" required error={visibleError('benefit')} className="sm:col-span-2">
              <input type="text" {...bind('benefit')} placeholder="e.g. ₹10,000 per year + fee reimbursement" />
            </Field>

            <Field
              id="deadline"
              label="Application deadline"
              error={visibleError('deadline')}
              hint="Leave empty if the deadline is not stated."
            >
              <input type="date" {...bind('deadline')} />
            </Field>

            <Field id="status" label="Status" required error={visibleError('status')}>
              <select {...bind('status')}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="link" label="Official application link" required error={visibleError('link')} className="sm:col-span-2">
              <input type="url" inputMode="url" {...bind('link')} placeholder="https://" />
            </Field>
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
        {submitted && errorCount > 0 && (
          <p role="alert" className="text-sm text-rose-600 sm:mr-auto">
            Please fix {errorCount} field{errorCount === 1 ? '' : 's'} above.
          </p>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button type="submit" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800">
          {initialValues ? 'Save changes' : 'Add scholarship'}
        </button>
      </footer>
    </form>
  );
}
