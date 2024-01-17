import { MigrationInterface } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class Initial1705426949355 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    await queryRunner.insertOne('users', {
      login: 'admin',
      password: '$2a$10$cwMALy0Neeup/Lo25VvAb.TgiIAV.ubhjLwTXnhQGKiRwXaOxPJ3.',
      firstName: 'Сотрудник',
      lastName: 'optimacros',
    });
  }

  public async down(queryRunner: MongoQueryRunner): Promise<void> {
    await queryRunner.deleteOne('users', { login: 'admin' });
  }
}
