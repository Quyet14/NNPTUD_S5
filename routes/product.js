var express = require('express');
var router = express.Router();
let products = require('../schemas/product');
let { Response } = require('../utils/responseHandler');
let { Authentication, Authorization } = require('../utils/authHandler');

/* GET products listing. */
router.get('/', Authentication, Authorization("USER", "MOD", "ADMIN"), async function(req, res, next) {
  let allProducts = await products.find({isDeleted: false}).populate({
    path: 'category',
    select: 'name'
  });
  Response(res, 200, true, allProducts);
});

router.get('/:id', Authentication, Authorization("USER", "MOD", "ADMIN"), async function(req, res, next) {
  try {
    let product = await products.findById(req.params.id).populate({
      path: 'category',
      select: 'name'
    });
    if (!product || product.isDeleted) {
      return Response(res, 404, false, "Product not found");
    }
    Response(res, 200, true, product);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
});

router.post('/', Authentication, Authorization("MOD", "ADMIN"), async function(req, res, next) {
  let newProduct = new products({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  });
  await newProduct.save();
  Response(res, 201, true, newProduct);
});

router.put('/:id', Authentication, Authorization("MOD", "ADMIN"), async function(req, res, next) {
  let product = await products.findById(req.params.id);
  if (!product || product.isDeleted) {
    return Response(res, 404, false, "Product not found");
  }
  product.name = req.body.name ? req.body.name : product.name;
  product.description = req.body.description ? req.body.description : product.description;
  product.price = req.body.price ? req.body.price : product.price;
  product.category = req.body.category ? req.body.category : product.category;
  await product.save();
  Response(res, 200, true, product);
});

router.delete('/:id', Authentication, Authorization("ADMIN"), async function(req, res, next) {
  let product = await products.findById(req.params.id);
  if (!product || product.isDeleted) {
    return Response(res, 404, false, "Product not found");
  }
  product.isDeleted = true;
  await product.save();
  Response(res, 200, true, "Product deleted");
});

module.exports = router;
