// storage.js
// Persists transactions and budget per logged-in user, using localStorage,
// the same way the original vanilla-JS version did.

function txKey(userId) {
  return `expenseTrackerTransactions_${userId}`;
}

function budgetKey(userId) {
  return `expenseTrackerBudget_${userId}`;
}

export function getTransactions(userId) {
  const data = localStorage.getItem(txKey(userId));
  return data ? JSON.parse(data) : [];
}

export function saveTransactions(userId, transactions) {
  localStorage.setItem(txKey(userId), JSON.stringify(transactions));
}

export function getBudget(userId) {
  const data = localStorage.getItem(budgetKey(userId));
  return data ? JSON.parse(data) : 0;
}

export function saveBudget(userId, amount) {
  localStorage.setItem(budgetKey(userId), JSON.stringify(amount));
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Rent',
  'Bills',
  'Education',
  'Healthcare',
  'Entertainment',
  'Other'
];

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Business', 'Investment', 'Gift'];
