module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: Sequelize.STRING,
    age: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    isActivated: Sequelize.INTEGER,
    activationLink: Sequelize.STRING,
  }, {
    freezeTableName: true,
  })

  return User
}