const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
      ssl: { rejectUnauthorized: false }
  },
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./models/user.model")(sequelize, Sequelize);
db.Tweet = require("./models/tweet.model")(sequelize, Sequelize);
db.User.hasMany(db.Tweet, { foreignKey: 'user_id' });
db.Tweet.belongsTo(db.User, { foreignKey: 'user_id' });

const events = [
  {name: 'beforeExit', exitCode: 0 },
  {name: 'uncaughtExecption', exitCode: 1 },
  {name: 'SIGINT', exitCode: 130 },
  {name: 'SIGTERM', exitCode: 143 }
];

events.forEach(e => {
  process.on(e.name, () => {
    sequelize.connectionManager.close()
      .then(() => { 
        console.log('connection cleaned');
        process.exit(e.exitCode) ;
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
});

module.exports = db;