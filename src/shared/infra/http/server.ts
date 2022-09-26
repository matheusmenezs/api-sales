import { app } from './app';

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`),
);

process.on('SIGINT', () => {
  server.close();
  console.log(`Server connection closed`);
});
