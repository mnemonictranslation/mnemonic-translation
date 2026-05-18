const attempts: { [key: string]: number[] } = {};
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  
  if (!attempts[identifier]) {
    attempts[identifier] = [];
  }

  // Remove old attempts
  attempts[identifier] = attempts[identifier].filter(
    time => now - time < WINDOW_MS
  );

  if (attempts[identifier].length >= MAX_ATTEMPTS) {
    return false; // Rate limited
  }

  attempts[identifier].push(now);
  return true;
}