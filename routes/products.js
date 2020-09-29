const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/fetch').get((req, res) => {
    Product.find()
        .then(products => res.json({
            status: 200,
            is_warning: false,
            message: "",
            products: products
        }))
        .catch(err => res.status(400).json({
            status: 400,
            is_warning: true,
            message: err,
            products: null
        }));
});

router.route('/find').post((req, res) => {
    const regex = new RegExp(req.body.title, 'i')
    Product.find({
        title: regex
    })
        .then(products => res.json({
            status: 200,
            is_warning: false,
            message: "",
            products: products
        }))
        .catch(err => res.status(400).json({
            status: 400,
            is_warning: true,
            message: err,
            products: null
        }));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json({
            status: 200,
            is_warning: false,
            message: "",
            product: product
        }))
        .catch(err => res.status(400).json({
            status: 400,
            is_warning: true,
            message: err.message,
            product: null
        }));
});

module.exports = router;