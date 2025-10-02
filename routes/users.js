var express = require('express');
var router = express.Router();
const { createUser, getAllUsers, getUserById, getUserByUsername, softDeleteUser, updateUserStatus } = require('../schemas/user');

/* GET all users */
router.get('/', async function(req, res, next) {
  try {
    const { username, fullName } = req.query;
    const users = await getAllUsers(username, fullName);
    res.send({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* GET user by id */
router.get('/:id', async function(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
    res.send({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* GET user by username */
router.get('/username/:username', async function(req, res, next) {
  try {
    const user = await getUserByUsername(req.params.username);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
    res.send({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* POST create user */
router.post('/', async function(req, res, next) {
  try {
    const newUser = await createUser(req.body);
    res.send({
      success: true,
      data: newUser
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

/* POST update user status */
router.post('/update-status', async function(req, res, next) {
  try {
    const { email, username } = req.body;
    const user = await updateUserStatus(email, username);
    res.send({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* DELETE soft delete user */
router.delete('/:id', async function(req, res, next) {
  try {
    const deletedUser = await softDeleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
    res.send({
      success: true,
      data: deletedUser
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
