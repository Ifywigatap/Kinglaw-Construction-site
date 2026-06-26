import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authRateLimiter, checkRateLimit } from './_lib/rate-limit';

//! CRITICAL: SERVERLESS STATELESSNESS WARNING
//! This mock database is for demonstration purposes only.
//! In a serverless environment like Vercel, this in-memory object will be reset
//! on every request. This means any user registered here will be lost immediately.
//!
//! TO FIX THIS: You MUST replace this with a connection to a persistent database
//! such as Vercel Postgres, Vercel KV, MongoDB Atlas, Supabase, etc.
const MOCK_DB = {
  users: [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      hashedPassword: '$2b$10$N9qo8uLOickgx2ZMR91D0OUSS1ZonOpZAK64bUfxT2uHEg6imSu8W',
    },
  ],
};

// Function to find a user by email
const findUserByEmail = async (email) => {
  return MOCK_DB.users.find(user => user.email === email);
};

// Function to create a new user
const createUser = async (userData) => {
  const newUser = {
    id: MOCK_DB.users.length + 1, // simple id generation
    ...userData,
  };
  MOCK_DB.users.push(newUser);
  const { hashedPassword, ...userToReturn } = newUser;
  return userToReturn;
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
        message: 'Too many accounts created from this IP. Please try again later.',
      });
    }

    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return response.status(409).json({ message: 'User with this email already exists.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await createUser({ name, email, hashedPassword });
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return response.status(201).json({ token, user: newUser });
  } catch (error) {
    // Log the specific error for better server-side debugging.
    console.error('Registration API Error:', error.name, error.message);
    return response.status(500).json({ message: 'Internal Server Error.' });
  }
}