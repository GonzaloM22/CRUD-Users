const express = require('express');
const router = express.Router();
const {
  getUsers,
  newUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController.js');

router.get('/list', getUsers);
router.post('/new', newUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;
