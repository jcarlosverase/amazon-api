const router = require('express').Router();
let Product = require('../models/product.model');
let API_KEY = "4c6275f3-3c21-49fa-8928-ba8c5c935b3a";

/**
 * @swagger
 * /fetch:
 *  post:
 *    description: Fetch all products
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error ocurred
 */
router.route('/fetch').post((req, res) => {
    if (!req.get('API_KEY')) {
        res.status(400).json({
            status: 400,
            message: "Missing Api Key"
        });
    } else if (req.get('API_KEY') != API_KEY) {
        res.status(400).json({
            status: 400,
            message: "Invalid Api Key"
        })
    }

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

/**
 * @swagger
 * /find:
 *  post:
 *    description: Find products by title
 *    parameters:
 *    - name: title
 *      description: Product title
 *      in: path
 *      required: true
 *      type: string
 *    produces:
 *    - application/json
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error ocurred
 */
router.route('/find').post((req, res) => {
    if (!req.get('API_KEY')) {
        res.status(400).json({
            status: 400,
            message: "Missing Api Key"
        });
    } else if (req.get('API_KEY') != API_KEY) {
        res.status(400).json({
            status: 400,
            message: "Invalid Api Key"
        })
    }

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

/**
 * @swagger
 * /get:
 *  get:
 *    description: Get product by ID
 *    parameters:
 *    - name: id
 *      description: Product ID
 *      in: path
 *      required: true
 *      type: string
 *    produces:
 *    - application/json
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: An error ocurred
 */
router.route('/get/:id').get((req, res) => {
    if (!req.get('API_KEY')) {
        res.status(400).json({
            status: 400,
            message: "Missing Api Key"
        });
    } else if (req.get('API_KEY') != API_KEY) {
        res.status(400).json({
            status: 400,
            message: "Invalid Api Key"
        })
    }

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