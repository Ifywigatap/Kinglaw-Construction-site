import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

/**
 * Creates a new rate limiter instance.
 * This configuration allows 5 requests from the same IP address within a 10-second window.
 * @see https://github.com/upstash/ratelimit
 */
export const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

/**
 * Checks if a request is rate-limited based on its IP address.
 * @param {Request} request The incoming request object.
 * @returns {Promise<{isRateLimited: boolean, limit: number, remaining: number, reset: number}>}
 */
export async function checkRateLimit(request) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    return { isRateLimited: !success, limit, remaining, reset };
}