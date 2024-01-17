import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';

export const TypeORMMongoDBTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'mongodb',
    url: config.db.testUrl,
    useNewUrlParser: true,
    synchronize: false,
    logging: true,
    useUnifiedTopology: true,
    entities,
  });
