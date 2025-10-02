var express = require('express');
var router = express.Router();
const { createRole, getAllRoles, getRoleById, getRoleByName, softDeleteRole } = require('../schemas/role');

/* GET all roles */
router.get('/', async function(req, res, next) {
  try {
    const roles = await getAllRoles();
    res.send({
      success: true,
      data: roles
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* GET role by id */
router.get('/:id', async function(req, res, next) {
  try {
    const role = await getRoleById(req.params.id);
    if (!role) {
      return res.status(404).send({
        success: false,
        message: 'Role not found'
      });
    }
    res.send({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* GET role by name */
router.get('/name/:name', async function(req, res, next) {
  try {
    const role = await getRoleByName(req.params.name);
    if (!role) {
      return res.status(404).send({
        success: false,
        message: 'Role not found'
      });
    }
    res.send({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* POST create a new role */
router.post('/', async function(req, res, next) {
  try {
    const roleData = req.body;
    const role = await createRole(roleData);
    res.send({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

/* DELETE soft delete a role */
router.delete('/:id', async function(req, res, next) {
  try {
    const role = await softDeleteRole(req.params.id);
    if (!role) {
      return res.status(404).send({
        success: false,
        message: 'Role not found'
      });
    }
    res.send({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
