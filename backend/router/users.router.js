const express = require('express');

const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controller/users.controller');

const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', validateSession, getAllUsers);
router.get('/:id', validateSession, getUserById);
router.post('/', createNewUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

module.exports = { usersRouter: router };
