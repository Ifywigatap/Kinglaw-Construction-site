import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authRateLimiter, checkRateLimit } from './_lib/rate-limit';

//! CRITICAL: SERVERLESS STATELESSNESS WARNING
//! This mock database is for demonstration purposes only.
//! In a serverless environment like Vercel, this in-memory object will be reset
//! on every request. This means any user registered via the /api/register endpoint
//! will NOT exist when this /api/login endpoint is called.
//!
//! TO FIX THIS: You MUST replace this with a connection to a persistent database
//! such as Vercel Postgres, Vercel KV, MongoDB Atlas, Supabase, etc.
const MOCK_DB = {
  users: [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      hashedPassword: '$2b$10$N9qo8uLOickgx2ZMR91D0OUSS1ZonOpZAK64bUfxT2uHEg6imSu8W', // Hash for "password"
    },
  ],
};

const findUser = async (email, password) => {
  // 1. Find user by email (in a real app, you would query your database)
  const userRecord = MOCK_DB.users.find(u => u.email === email);

  if (userRecord) {
    // 2. Compare the provided password with the stored hash.
    const match = await bcrypt.compare(password, userRecord.hashedPassword);
    if (match) {
      // Passwords match, return user data (but NEVER the password hash).
      const { hashedPassword, ...user } = userRecord;
      return user;
    }
  }
  // User not found or password doesn't match.
  return null;
};

export default async function handler(request, response) {
  // Set CORS headers
  // IMPORTANT: In production, replace '*' with your frontend's domain for security.
  response.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { isRateLimited, limit, remaining, reset } = await checkRateLimit(authRateLimiter, request);

    // Set rate limit headers on the response
    response.setHeader('X-RateLimit-Limit', limit);
    response.setHeader('X-RateLimit-Remaining', remaining);
    response.setHeader('X-RateLimit-Reset', reset);

    if (isRateLimited) {
      return response.status(429).json({
        message: 'Too many login attempts. Please try again later.',
      });
    }

    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await findUser(email, password);

    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return response.status(200).json({ token, user });
  } catch (error) {
    // Log the specific error for better server-side debugging.
    console.error('Login API Error:', error.name, error.message);
    return response.status(500).json({ message: 'Internal Server Error.' });
  }
}