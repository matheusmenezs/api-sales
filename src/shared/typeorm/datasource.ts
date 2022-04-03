import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'apisales',
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations',
  },
});