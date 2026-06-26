/**
 * Checks if a rate limit is active for a given key.
 * @param {string} key - The localStorage key.
 * @param {number} cooldownMs - Cooldown period in milliseconds.
 * @returns {number} - Remaining seconds if limited, otherwise 0.
 */
export const getRateLimitRemaining = (key, cooldownMs) => {
  const lastSub = localStorage.getItem(key);
  if (!lastSub) return 0;

  const now = Date.now();
  const diff = now - parseInt(lastSub, 10);

  if (diff < cooldownMs) {
    return Math.ceil((cooldownMs - diff) / 1000);
  }

  return 0;
};

/**
 * Records a successful action to trigger the rate limit cooldown.
 * @param {string} key - The localStorage key.
 */
export const recordRateLimitHit = (key) => {
  localStorage.setItem(key, Date.now().toString());
};