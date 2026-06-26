import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error('Error: JWT_SECRET is not defined in your .env file.');
  console.error('Please make sure your .env file is in the project root and contains a JWT_SECRET value.');
  process.exit(1);
}

// Default payload for the token. You can customize this.
const defaultPayload = {
  userId: 1,
  email: 'admin@example.com',
};

// You can pass a JSON string as a command-line argument to use a custom payload.
const customPayloadArg = process.argv[2];
let payload;

if (customPayloadArg) {
  try {
    payload = JSON.parse(customPayloadArg);
    console.log('✅ Using custom payload:', payload);
  } catch (error) {
    console.error('❌ Invalid JSON payload provided. Using default payload instead.');
    console.error('Example usage: node scripts/generate-jwt.js \'{"userId": 2, "email": "test@test.com"}\'');
    payload = defaultPayload;
  }
} else {
  console.log('✅ Using default payload:', defaultPayload);
  payload = defaultPayload;
}

// Define token expiration (e.g., '1h', '7d', '365d').
const expiresIn = '1h';

const token = jwt.sign(payload, secret, { expiresIn });

console.log('\n🔑 Generated JWT:');
console.log(token);
console.log(`\nThis token expires in: ${expiresIn}`);