import { dataSource } from 'src/shared/typeorm/ormconfig';

export const connectDB = async () => {
  const connection = await dataSource.connect();
  console.log(
    `Connection established with database ${connection.options.database}`,
  );

  process.on('SIGINT', () => {
    connection
      .close()
      .then(() => console.log(`Database connection was closed`));
  });
};
