const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const UserDto = require('../dtos/user-dto');


class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('', errors.array()))
      }
      const { username, age, email, password } = req.body;
      const userData = await userService.registration(username, age, email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      req.user = userData;
      return res.json(userData);
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      console.log(activationLink, 'PARAMSID');
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async editUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const { username, email } = req.body;

      const updateUser = await userService.updateUserProfile(userId, username, email);

      req.user = updateUser;
    
      const userUpDate = new UserDto(updateUser);
     
      res.json(userUpDate)
    } catch (error) {
      next(error)
    }
  }

  async taskCreate(req, res, next) {
    try {
      const { title, description, deadline, status } = req.body;
      const taskUs = await userService.taskCreation(title, description, deadline, status, req.user.id);

      req.user = taskUs;
      res.json(taskUs)
    } catch (error) {
      next(error)
    }
  }

  async taskEdit(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('', errors.array()));
      }

      const taskId = req.params.taskId;
      const { status } = req.body;

      const updatedTask = await userService.updateTask(taskId, status);

      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const taskId = req.params.taskId;

      const message = await userService.deleteTask(taskId);

      return res.json({ message });
    } catch (error) {
      next(error)
    }
  }

  async queryRequests(req, res, next) {
    try {
      const userId = req.user.id;
      const { status, title, order } = req.query;
      console.log(userId, 'userId===>');

      let tasks;

      if (status && order) {
        tasks = await userService.getTasksByStatusAndOrder(userId,status, order);
      } else if (status) {
        tasks = await userService.getTasksByStatus(status,userId);
      } else if (title) {
        tasks = await userService.getTasksByTitle(title,userId);
      } else if (order) {
        tasks = await userService.sortByTasks(order,userId);
      } else {
        tasks = await userService.getTasksByUserId(userId);
      }

      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getStatistic(req, res, next) {
    const userId = req.user.id;
    try {
      const statistics = await userService.statistics(userId);
      res.json(statistics);
    } catch (error) {
      next(error);
    }
  }

 
}

module.exports = new UserController();


