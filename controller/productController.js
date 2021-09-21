import Products from '../models/products.js';
// const multer = require('multer')


/* //define storage for images
const storage = multer.diskStorage({
    destination: (request, file, callback) =>{
        callback(null, './assets/photos');
    },

    //add back the extension
     filename: (request, file, callback) =>{
        callback(null, Date.now() + file.originalname);
     },
})

//upload parameter for multer
const upload = multer({
    storage:storage,
    limits:{
        fieldSize: 2048 * 2048 * 3,
    }
}) */


//Create Product
export const createProduct = async (req, res ) =>{
    
        const { barcode,image,productName,
            net, calorie,protein,
            carbs,fat,isIt,ingredients,} = req.body;
            
            const productExist = await Products.findOne({ barcode });
            
            if (productExist) {
                res.status(400);
                throw new Error('Product already exists');
            }
            
            const createNewProduct = await Products.create(
                {   barcode,image,productName,
                    net, calorie,protein,
                    carbs,fat,isIt,ingredients,
                },   
                );
                createNewProduct.save()
                if (createNewProduct) {
                    res.status(201).json(createNewProduct);
                } else {
                    res.status(400);
                    throw new Error('Invalid product data');
                }
            
         
        };

//Get products
export const getProduct = async(req, res) => {
        await Products.find()
            .then(foundProducts=>res.json(foundProducts))

}

export default {
    createProduct,
    getProduct,
};