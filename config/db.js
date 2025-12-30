module.exports = {
  development: {
    username: 'bbg-secret-menu',
    password: 'JIBdHC3v^wP#',
    database: 'bbg',
    host: '68.178.238.97',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4'
    },
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      max: 3,
      acquire: 30000,
      idleTimeoutMillis: 10000,
      idle: 10000
    },
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_general_ci'
      }
    }
  },
  production: {
    username: 'bbg-secret-menu',
    password: 'JIBdHC3v^wP#',
    database: 'bbg',
    host: '68.178.238.97',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4'
    },
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      max: 3,
      acquire: 30000,
      idleTimeoutMillis: 10000,
      idle: 10000
    },
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_general_ci'
      }
    }
  }
};

