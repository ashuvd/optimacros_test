import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({
  path: '.env',
});

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4200,
  db: {
    url: process.env.MONGODB_URL,
    testUrl: process.env.MONGODB_URL_TEST,
  },
};
