import { Router } from "express";
import { productValidation } from "../middlewares/productValidation.js";
import productController from "../controllers/productController.js";

const productRoute = Router();


productRoute.get("/", productController.getAllProducts);
productRoute.get("/:id", productController.getProductById);
productRoute.post("/", [productValidation], productController.createProduct);
productRoute.put("/:id", [productValidation], productController.updateProduct);
productRoute.delete("/:id", productController.deleteProduct);


export default productRoute;

