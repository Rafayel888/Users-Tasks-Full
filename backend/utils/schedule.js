const { Op } = require("sequelize");
const { Task, User } = require("../models");
const cron = require('node-cron');
const mailService = require("../service/mail-service");
const moment = require('moment');


module.exports = () => {
  cron.schedule('0 23 * * *', async () => {

    try {
      const oneHourLater = moment().add(1, 'hour');

      const tasks = await Task.findAll({
        where: {
          deadline: {
            [Op.lt]: oneHourLater,
          },
        },
        include: User,
      });

      for (const task of tasks) {
        const userEmail = task.user.email;
        mailService.sendTaskReminder(userEmail, task.title);
      }

    } catch (error) {
      console.error('Ошибка:', error);
    }
  });
}
