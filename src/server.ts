import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/typeorm';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';
import routes from '@shared/routes';

const app = express();
app.use(cors());


const getDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

// show time execution on prompt
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl} [STARTED]`);
  const start = process.hrtime();

  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    console.log(
      `${req.method} ${req.originalUrl
      } [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`,
    );
  });

  res.on('close', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    console.log(
      `${req.method} ${req.originalUrl
      } [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`,
    );
  });

  next();
});

app.use(express.json())

app.use(routes);

// on Errors
app.use((err: Error | AppError, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {

    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = process.env.PORT || 3333;

const url = process.env.APP_WEB_URL;
const host = process.env.NODE_ENV === 'development' ? `http://localhost` : url;

app.listen(port, () => {
  console.log(`⚡️ Server started on ${host}:${port}`)
})
