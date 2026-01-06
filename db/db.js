const Sequelize = require('sequelize');
 configdb = require('../config/db');
//console.log('config :',config)
const models = require('./models');

// const firebase = require('firebase');
// const firebaseApp = firebase.initializeApp(config.firebase);

 db = new Sequelize(configdb.production.database, configdb.production.username, configdb.production.password,
   {
  host: configdb.production.host,
  dialect: configdb.production.dialect,
  pool: configdb.production.pool
  }
);

db.models = models;
//db.sync({force: true});

module.exports = db;
