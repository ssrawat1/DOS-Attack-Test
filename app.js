import bcrypt from 'bcrypt';
import express from 'express';

const app = express();

app.use((req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500' });
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/register', async (req, res) => {
  bcrypt.hash('$aNjAy_pb_03', 14);
  return res.json({ message: 'Register successfully' });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is listening on address, http://localhost:${PORT}`);
});
