require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      charset: 'utf8mb4',
    },
    "define": {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      charset: 'utf8mb4',
    },
    "define": {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      charset: 'utf8mb4',
    },
    "define": {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
  }
}
