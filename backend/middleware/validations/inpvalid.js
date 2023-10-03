const { body } = require('express-validator');



const registerValidation = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('age')
    .isInt({ min: 12 })
    .withMessage('Age must be an integer and at least 12 years old'),
  body('password')
    .isLength({ min: 5, max: 32 })
    .withMessage('Password must be at least 5 characters'),

];





module.exports = { registerValidation }