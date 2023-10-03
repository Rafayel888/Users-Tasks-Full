const userController = require('../controllers/user-controller');
const router = require('express').Router();
const { registerValidation,  loginValidation } = require('../middleware/validations/inpvalid');
const authMiddleware = require('../middleware//auth-middleware');


// ! POST
router.post('/registration', registerValidation, userController.registration);
router.post('/login',userController.login);
router.post('/logout', userController.logout);
router.post('/tasks', authMiddleware, userController.taskCreate);


// ! PATCH
router.patch('/user/update/:userId', userController.editUser);
router.patch('/task/:taskId', userController.taskEdit);


// ! GET
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/tasks', authMiddleware, userController.queryRequests);
router.get('/tasks/static', authMiddleware, userController.getStatistic);

// ! DELETE
router.delete('/task/:taskId', userController.deleteTask);



module.exports = router;