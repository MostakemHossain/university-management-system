import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

process.on('unhandledRejection', () => {
  console.log('unhandledRejection is Detected. Shutting down.......');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  console.log('Uncaught Exception is Detected. Sutting down.......');
  process.exit(1);
});

main();
