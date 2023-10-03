const { User, Task, sequelize } = require('../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const { Op } = require('sequelize');


class UserService {
  async registration(username, age, email, password) {
    try {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        throw ApiError.BadRequest(`User with email address ${email} already exists`)
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const activationLink = uuid.v4();

      const user = await User.create({ username, age, email, password: hashPassword, activationLink });
      await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

      const userDto = new UserDto(user);
      console.log(userDto, 'UserDTO');
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto }
    } catch (error) {
      throw error
    }
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link')
    }
    user.isActivated = 1;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('User with this email not found')
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password')
    }
    const userDto = new UserDto(user);
    if (!userDto.isActivated) {
      throw ApiError.BadRequest('Not Active')
    }
    const token = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, token.refreshToken);


    return { ...token, user: userDto }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validationRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }


    const user = await User.findOne({ where: { id: userData.id } });
    if (user) {
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto };
    }

  }

  async updateUserProfile(userId, username, email) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw ApiError.NotFoundError('User not found');
      }

      user.username = username;
      user.email = email;

      await user.save();

      return user;
    } catch (error) {
      throw error
    }
  }

  async taskCreation(title, description, deadline, status, userId) {
    const task = await Task.create({ title, description, deadline, status, users_id: userId });

    return { task }
  }

  async updateTask(id, status) {
    try {
      const task = await Task.findByPk(id);

      if (!task) {
        throw ApiError.BadRequest('Task not found')
      }


      task.status = status;

      await task.save();

      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const task = await Task.findByPk(taskId);

      if (!task) {
        throw ApiError.BadRequest('Task not found')
      }

      await task.destroy()

      return 'Task deleted successfully'
    } catch (error) {
      throw error;
    }
  }

  async getTasksByUserId(userId) {
    try {
      const tasks = await Task.findAll({ where: { users_id: userId } });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getTasksByStatus(status, userId) {
    try {
      const tasks = await Task.findAll({ where: { status, users_id: userId } });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getTasksByTitle(title, userId) {
    try {
      const tasks = await Task.findAll({
        where: {
          title: {
            where: { users_id: userId },
            [Op.like]: `%${title}%`
          }
        }
      });
      return tasks;
    } catch (error) {
      throw error;
    }
  }


  async sortByTasks(sortOrder, userId) {
    try {
      const allowedSortOrders = ['ASC', 'DESC'];

      if (!allowedSortOrders.includes(sortOrder)) {
        throw ApiError.BadRequest('Invalid sort order');
      }

      const tasks = await Task.findAll({
        where: { users_id: userId },
        order: [['createdAt', sortOrder]],
      });

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getTasksByStatusAndOrder(userId, status, order) {
    try {
      const allowedStatuses = ['todo', 'inProgress', 'done'];
      const allowedSortOrders = ['ASC', 'DESC'];

      if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid status value');
      }

      if (!allowedSortOrders.includes(order)) {
        throw new Error('Invalid order value');
      }

      const tasks = await Task.findAll({
        where: { users_id: userId, status },
        order: [['createdAt', order]],
      });

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async statistics(userId) {
    try {
      const statistics = await Task.findAll({
        attributes: ['status', [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
        where: {
          users_id: userId,
        },
        group: ['status'],
      });

      return statistics;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new UserService();
