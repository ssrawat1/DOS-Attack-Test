import bcrypt from 'bcrypt';
import express from 'express';
import { rateLimiter } from './middleware/rateLimit.js';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import throttle from './middleware/throttle.js';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 10 second
  limit: 10, // 2 request
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

const app = express();
app.use(express.json());

// app.use(limiter);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        reportUri: '/csp-violation-report',
      },
    },
  })
);

app.use((req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/register', limiter, throttle({ waitTime: 2000 }), async (req, res) => {
  await bcrypt.hash('$aNjAy_pb_03', 14);
  return res.json({ message: 'Register successfully' });
});

const PORT = 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server is listening on address, http://localhost:${PORT}`);
});
