// auth.js
// Simple client-side authentication using localStorage.
// Prototype-only: fine for a college project demo, not for real production use.

const USERS_KEY = 'expenseTrackerUsers';
const SESSION_KEY = 'expenseTrackerCurrentUser';

function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(name, email, password) {
  const users = getUsers();

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password // plain text, demo purposes only
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: 'Account created successfully.' };
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { success: true, user: session };
}

export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
