require('dotenv').config({ path: './.env' });

export default {
  env: process.env.NODE_ENV || 'development',
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  database: {
    host: process.env.DB_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
