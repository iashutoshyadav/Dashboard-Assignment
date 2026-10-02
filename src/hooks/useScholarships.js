import { useEffect, useState } from 'react';
import seedData from '../data/scholarships.json';

const STORAGE_KEY = 'k12-scholarship-crm:v1';

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
  }
  return seedData;
}

function createId() {
  return `sch-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useScholarships() {
  const [scholarships, setScholarships] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scholarships));
    } catch {
      // Ignore: the demo still works in memory.
    }
  }, [scholarships]);

  const addScholarship = (data) => {
    setScholarships((prev) => [{ ...data, id: createId() }, ...prev]);
  };

  const updateScholarship = (id, changes) => {
    setScholarships((prev) => prev.map((s) => (s.id === id ? { ...s, ...changes } : s)));
  };

  const updateStatus = (id, status) => updateScholarship(id, { status });
  const resetToSampleData = () => setScholarships(seedData);

  return { scholarships, addScholarship, updateScholarship, updateStatus, resetToSampleData };
}
