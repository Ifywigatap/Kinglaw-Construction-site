import jwt from 'jsonwebtoken';

//! CRITICAL: SERVERLESS STATELESSNESS WARNING
//! This mock database is for demonstration purposes only.
//! In a serverless environment like Vercel, this in-memory object will be reset
//! on every request. This means any user session you try to verify will likely
//! not be found unless it's the hardcoded user below.
//!
//! TO FIX THIS: You MUST replace this with a connection to a persistent database
//! such as Vercel Postgres, Vercel KV, MongoDB Atlas, Supabase, etc.
const MOCK_DB = {
  users: [
    { id: 1, name: 'Admin User', email: 'admin@example.com' },
  ],
};

const findUserById = async (id) => {
  // In a real application, you would query your database for the user by their ID.
  return MOCK_DB.users.find(u => u.id === id) || null;
};

export default async function handler(request, response) {
  // Set CORS headers
  // IMPORTANT: In production, replace '*' with your frontend's domain for security.
  response.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'GET') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Authentication token required.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.userId);

    if (!user) {
      // The token is valid, but the user it refers to no longer exists.
      // Treat this as an authentication failure.
      return response.status(401).json({ message: 'User for this token not found.' });
    }

    return response.status(200).json(user);
  } catch (error) {
    // Log the specific error for better server-side debugging.
    console.error('Token verification error in /api/me:', error.name, error.message);
    return response.status(401).json({ message: 'Invalid or expired token.' });
  }
}