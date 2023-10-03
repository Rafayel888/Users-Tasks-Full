module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define("token", {
    refreshToken: Sequelize.STRING,
  }, {
    freezeTableName: true,
  })

  return Token
}