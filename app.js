import bcrypt from 'bcrypt';
import express from 'express';
import { rateLimiter } from './middleware/rateLimit.js';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 second
  limit: 2, // 2 request
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
});

const app = express();

app.use((req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/register', limiter, async (req, res) => {
  bcrypt.hash('$aNjAy_pb_03', 14);
  return res.json({ message: 'Register successfully' });
});

const PORT = 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server is listening on address, http://localhost:${PORT}`);
});
