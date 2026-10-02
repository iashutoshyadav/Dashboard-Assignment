import { STATES, STATUSES } from '../constants';
import { daysUntil } from './date';

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateScholarship(values) {
  const errors = {};
  const name = values.name.trim();

  if (!name) errors.name = 'Scholarship name is required.';
  else if (name.length < 5) errors.name = 'Name should be at least 5 characters.';
  if (!STATES.includes(values.state)) errors.state = 'Please select a state.';
  if (!values.provider.trim()) errors.provider = 'Provider name is required.';
  if (!values.applicableClass.trim()) errors.applicableClass = 'Applicable class is required.';
  if (!values.eligibility.trim()) errors.eligibility = 'Eligibility criteria is required.';
  else if (values.eligibility.trim().length < 20)
    errors.eligibility = 'Please describe eligibility in a little more detail (20+ characters).';
  if (!values.benefit.trim()) errors.benefit = 'Scholarship amount or benefit is required.';
  if (values.status === 'Published' && daysUntil(values.deadline) < 0) {
    errors.deadline = 'A published scholarship cannot have a past deadline. Pick a later date or mark it Expired.';
  }
  if (!values.link.trim()) errors.link = 'Official application link is required.';
  else if (!isValidUrl(values.link.trim()))
    errors.link = 'Enter a full link starting with http:// or https://';
  if (!STATUSES.includes(values.status)) errors.status = 'Please select a status.';
  return errors;
}
