import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from"mongoose";
import bodyParser from "body-parser";
import router from "./routes/productRoutes.js";


dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use(express.json());

app.use("/", router);

/* app.use(bodyParser.urlencoded({extended: true})); */
/* mongoose.set('useCreateIndex', true); 
app.use(express.urlencoded({ extended: true }));
*/

const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.messagers));