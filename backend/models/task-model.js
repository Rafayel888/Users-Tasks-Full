module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("tasks", {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    deadline: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    status: Sequelize.STRING,
  }, {
    freezeTableName: true,
  });

  return Task;
};