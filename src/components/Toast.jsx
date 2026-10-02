import { useEffect } from 'react';
export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-lg bg-slate-900 px-4 py-3 text-center text-sm text-white shadow-lg"
    >
      {toast.message}
    </div>
  );
}
