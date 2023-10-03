const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  port: process.env.PORTDB,
  timezone: '+04:00',
});

const User = require('./user-model')(sequelize, Sequelize);
const Task = require('./task-model')(sequelize, Sequelize);

const Token = require('./token-model')(sequelize, Sequelize);


User.hasMany(Task, { foreignKey: 'users_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
User.hasMany(Token, { foreignKey: 'users_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' })

//! belongsTo
Task.belongsTo(User, { foreignKey: 'users_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Token.belongsTo(User, {
  foreignKey: 'users_id', onDelete: 'CASCADE',
});



sequelize.sync();


module.exports = {
  sequelize,
  User,
  Task,
  Token

}