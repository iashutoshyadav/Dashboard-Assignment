import { useCallback, useMemo, useState } from 'react';
import { useScholarships } from './hooks/useScholarships';
import SummaryCards from './components/SummaryCards';
import Filters from './components/Filters';
import ScholarshipList from './components/ScholarshipList';
import ScholarshipForm from './components/ScholarshipForm';
import StudentPreviewCard from './components/StudentPreviewCard';
import Modal from './components/Modal';
import Toast from './components/Toast';

function matchesSearch(scholarship, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [scholarship.name, scholarship.provider, scholarship.applicableClass].some((text) =>
    text.toLowerCase().includes(q),
  );
}

export default function App() {
  const { scholarships, addScholarship, updateScholarship, updateStatus, resetToSampleData } = useScholarships();

  const [stateFilter, setStateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  // formTarget: null (closed) | { mode: 'add' } | { mode: 'edit', scholarship }
  const [formTarget, setFormTarget] = useState(null);
  const [previewTarget, setPreviewTarget] = useState(null);
  const [toast, setToast] = useState(null);

  // Step 1: narrow by state + search. Summary cards count this set,
  // so they always describe the state the employee has chosen.
  const inScope = useMemo(
    () =>
      scholarships.filter(
        (s) => (stateFilter === 'All' || s.state === stateFilter) && matchesSearch(s, search),
      ),
    [scholarships, stateFilter, search],
  );

  const counts = useMemo(
    () => ({
      All: inScope.length,
      Published: inScope.filter((s) => s.status === 'Published').length,
      Draft: inScope.filter((s) => s.status === 'Draft').length,
      Expired: inScope.filter((s) => s.status === 'Expired').length,
    }),
    [inScope],
  );

  // Step 2: narrow by status for the list itself.
  const visible = statusFilter === 'All' ? inScope : inScope.filter((s) => s.status === statusFilter);

  const showToast = (message) => setToast({ message });
  const dismissToast = useCallback(() => setToast(null), []);
  const closeForm = useCallback(() => setFormTarget(null), []);
  const closePreview = useCallback(() => setPreviewTarget(null), []);

  const handleStatusChange = (id, status) => {
    updateStatus(id, status);
    const name = scholarships.find((s) => s.id === id)?.name;
    showToast(`"${name}" marked as ${status}`);
  };

  const handleFormSubmit = (data) => {
    if (formTarget.mode === 'edit') {
      updateScholarship(formTarget.scholarship.id, data);
      showToast('Changes saved');
    } else {
      addScholarship(data);
      showToast('Scholarship added');
    }
    setFormTarget(null);
  };

  const handleReset = () => {
    if (window.confirm('Reset all scholarships to the original sample data?')) {
      resetToSampleData();
      showToast('Sample data restored');
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="size-8" />
            <div>
              <p className="text-sm leading-tight font-semibold text-brand-700">K12 Hunar</p>
              <p className="text-xs leading-tight text-slate-500">Scholarship CRM · Employee</p>
            </div>
          </div>
          <button type="button" onClick={handleReset} className="text-xs text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline">
            Reset demo data
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Scholarship Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">
              {stateFilter === 'All' ? 'All states' : stateFilter} · {visible.length} of {scholarships.length} shown
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormTarget({ mode: 'add' })}
            className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-800"
          >
            + Add Scholarship
          </button>
        </div>

        <SummaryCards counts={counts} activeStatus={statusFilter} onSelect={setStatusFilter} />

        <Filters
          state={stateFilter}
          onStateChange={setStateFilter}
          status={statusFilter}
          onStatusChange={setStatusFilter}
          search={search}
          onSearchChange={setSearch}
        />

        <ScholarshipList
          scholarships={visible}
          onStatusChange={handleStatusChange}
          onEdit={(scholarship) => setFormTarget({ mode: 'edit', scholarship })}
          onPreview={setPreviewTarget}
        />
      </main>

      {formTarget && (
        <Modal title={formTarget.mode === 'edit' ? 'Edit Scholarship' : 'Add Scholarship'} onClose={closeForm}>
          <ScholarshipForm
            initialValues={formTarget.scholarship}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {previewTarget && (
        <Modal title="Student preview" onClose={closePreview}>
          <div className="p-5">
            <StudentPreviewCard scholarship={previewTarget} />
          </div>
        </Modal>
      )}

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
