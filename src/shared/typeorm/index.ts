import { dataSource } from './datasource';

dataSource.initialize();
console.log(`Connection established with database ${dataSource.options.database}`);

process.on('SIGINT', () => {
  dataSource.destroy().then(() => console.log(`Database connection was closed`));
});
