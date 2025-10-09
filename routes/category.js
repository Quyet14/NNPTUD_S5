var express = require('express');
var router = express.Router();
let categories = require('../schemas/category');
let { Response } = require('../utils/responseHandler');
let { Authentication, Authorization } = require('../utils/authHandler');

/* GET categories listing. */
router.get('/', Authentication, Authorization("USER", "MOD", "ADMIN"), async function(req, res, next) {
  let allCategories = await categories.find({isDeleted: false});
  Response(res, 200, true, allCategories);
});

router.get('/:id', Authentication, Authorization("USER", "MOD", "ADMIN"), async function(req, res, next) {
  try {
    let category = await categories.findById(req.params.id);
    if (!category || category.isDeleted) {
      return Response(res, 404, false, "Category not found");
    }
    Response(res, 200, true, category);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.post('/', Authentication, Authorization("MOD", "ADMIN"), async function(req, res, next) {
  let newCategory = new categories({
    name: req.body.name,
    description: req.body.description
  });
  await newCategory.save();
  Response(res, 201, true, newCategory);
});

router.put('/:id', Authentication, Authorization("MOD", "ADMIN"), async function(req, res, next) {
  let category = await categories.findById(req.params.id);
  if (!category || category.isDeleted) {
    return Response(res, 404, false, "Category not found");
  }
  category.name = req.body.name ? req.body.name : category.name;
  category.description = req.body.description ? req.body.description : category.description;
  await category.save();
  Response(res, 200, true, category);
});

router.delete('/:id', Authentication, Authorization("ADMIN"), async function(req, res, next) {
  let category = await categories.findById(req.params.id);
  if (!category || category.isDeleted) {
    return Response(res, 404, false, "Category not found");
  }
  category.isDeleted = true;
  await category.save();
  Response(res, 200, true, "Category deleted");
});

module.exports = router;
