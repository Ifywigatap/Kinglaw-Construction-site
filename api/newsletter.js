import { generalRateLimiter, checkRateLimit } from './_lib/rate-limit';

export default async function handler(request, response) {
  // Set CORS headers
  // IMPORTANT: In production, replace '*' with your frontend's domain for security.
  response.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { isRateLimited, limit, remaining, reset } = await checkRateLimit(generalRateLimiter, request);

    // Set rate limit headers on the response
    response.setHeader('X-RateLimit-Limit', limit);
    response.setHeader('X-RateLimit-Remaining', remaining);
    response.setHeader('X-RateLimit-Reset', reset);

    if (isRateLimited) {
      return response.status(429).json({
        message: 'Too many requests. Please try again in a few moments.',
      });
    }

    const { email } = request.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return response.status(400).json({ message: 'A valid email is required.' });
    }

    console.log(`New newsletter subscription: ${email}`);

    return response.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    // Log the specific error for better server-side debugging.
    console.error('Newsletter API Error:', error.name, error.message);
    return response.status(500).json({ message: 'Internal Server Error.' });
  }
}