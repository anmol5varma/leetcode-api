require('dotenv').config();

module.exports = {
  development: {
    username: 'anmolvarma',
    password: 'anmol',
    database: 'chitragupt',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'root',
    host: process.env.DB_HOST || 'root',
    dialect: process.env.DB_DIALECT || 'root',
  }
};
