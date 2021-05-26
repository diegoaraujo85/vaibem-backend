export default {
  jwt: {
    secret: process.env.APP_SECRET || '',
    // expiresIn: 3, // 60 segundos = 1 minuto
    expiresIn: '1d',
  },
};
