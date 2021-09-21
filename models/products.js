import mongoose from 'mongoose'

const products = mongoose.Schema([
    {
        barcode: {
          type: Number,
          required:true
        },
        image:{
          type: String,
          required:true
        },
        productName:{
          type: String,
          required:true
        },
        net: {
          type: String,
          required:true
        },
        calorie: {
          type: Number,
          required:true
        },
        protein: {
          type: Number,
          required:true
        },
        carbs: {
          type: Number,
          required:true
        },
        fat:{
          type: Number,
          required:true
        },
        isIt:[{
            type: String,
            required:true
          }],
        ingredients:[{
          type: String,
          required:true
        }],
      },]
)

const Products = mongoose.model('Products', products);

export default Products;