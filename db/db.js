const Sequelize = require('sequelize');
 config = require('../config/db');
//console.log('config :',config)
const models = require('./models');

// const firebase = require('firebase');
// const firebaseApp = firebase.initializeApp(config.firebase);

 db = new Sequelize(config.production.database, config.production.username, config.production.password,
   {
  host: config.production.host,
  dialect: config.production.dialect,
  pool: config.production.pool
  }
);

db.models = models;
//db.sync({force: true});

module.exports = db;
