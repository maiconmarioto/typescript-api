import 'reflect-metadata';
import '@config/env';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import logger, { LoggerStream } from '@config/logger';

import routes from './routes';

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.middleware();
    this.process();
    this.routes();
  }

  middleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      morgan(':method :url :status :response-time ms combined', {
        stream: new LoggerStream(),
      }),
    );
    this.app.use(errors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(errors());

    this.app.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
          return response
            .status(error.statusCode)
            .json({ status: 'error', nessage: error.message });
        }

        return response
          .status(500)
          .json({ status: 'error', message: 'Internal server error' });
      },
    );
  }

  process(): void {
    process.on('uncaughtException', e => {
      logger.error(e);
      process.exit(1);
    });

    process.on('unhandledRejection', err => {
      logger.error(err);
      process.exit(1);
    });
  }

  routes(): void {
    this.app.use(routes);
  }

  start(): void {
    const { PORT, HOST } = process.env;

    this.app.listen(PORT, () => {
      return logger.info(`Running on ${HOST}:${PORT}`);
    });
  }
}

const server = new Server();

server.start();
