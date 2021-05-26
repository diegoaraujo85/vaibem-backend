import { createConnection } from 'typeorm';

async function getConnection() {
  return await createConnection();
}
getConnection().then((conn) => {
  // process.env.NODE_ENV === 'development' ? console.log(conn) : '';
})


