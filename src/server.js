import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(
  pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  })
);

// Маршрути
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// Тестовий маршрут для помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// 500
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Запуск
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const PORT = process.env.PORT || 3000;
const start = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
