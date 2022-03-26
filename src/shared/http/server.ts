import { app } from './app';

const port = 3333;

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

process.on('SIGINT', () => {
  server.close();
  console.log(`Server connection closed`);
});
