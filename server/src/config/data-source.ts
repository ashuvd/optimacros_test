import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { config } from './index';

export const options: MongoConnectionOptions = {
  type: 'mongodb',
  url: config.db.url,
  useNewUrlParser: true,
  synchronize: false,
  logging: true,
  useUnifiedTopology: true,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
};

export default new DataSource(options);
