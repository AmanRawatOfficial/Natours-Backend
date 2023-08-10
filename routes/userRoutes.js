const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/update-data', authController.protect, userController.updateUser);
router.delete(
    '/delete-user',
    authController.protect,
    userController.deleteUser
);

router.patch(
    '/update-password',
    authController.protect,
    authController.updatePassword
);

router.get(
    '/me',
    authController.protect,
    userController.getMe,
    userController.getUser
);

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUserAdmin)
    .delete(userController.deleteUserAdmin);

module.exports = router;
