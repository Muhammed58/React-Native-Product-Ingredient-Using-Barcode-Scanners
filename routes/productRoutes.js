import express from "express";
import {createProduct, getProduct} from '../controller/productController.js'
const router = express.Router();


// Create Product
router.route('/create')
        .post(createProduct);

// Get Product
router.route('/products')
        .get(getProduct);


router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

 
        
export default router;