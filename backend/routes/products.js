const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(Products => res.json(Products))
    .catch(err => res.status(400).json('Error: ' + err));
});
/*
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newProduct = new Product({
    username,
    description,
    duration,
    date,
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
*/
router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(Product => res.json(Product))
    .catch(err => res.status(400).json('Error: ' + err));
});
/*
router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id)
    .then(Product => {
      Product.username = req.body.username;
      Product.description = req.body.description;
      Product.duration = Number(req.body.duration);
      Product.date = Date.parse(req.body.date);

      Product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
*/
module.exports = router;