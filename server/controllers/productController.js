import productService from "../services/productService.js";

const productController = {
    // ควบคุม Input และ Output ด้วย DTO 
    getAllProducts: async (req, res) => {
        try{
            const {keywords: name, category} = req.query;
            // ควบคุม Input ให้ส่งเฉพาะข้อมูลที่จำเป็นให้กับ Database
            const allProducts = await productService.getAllProducts(name, category);
            
            // Debug: ตรวจสอบข้อมูลที่ได้จาก database
            // console.log("Raw products from DB:", allProducts);
            // console.log("First product _id:", allProducts[0]?._id);

            // ควบคุม Output ให้ส่งเฉพาะข้อมูลที่อยากให้ Client เห็น
            return res.json({ 
                data: allProducts.map(product => ({
                    _id: product._id.toString(), // แปลง ObjectId เป็น string
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    created_at: product.created_at
                }))
            });

        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    },

    // ควบคุม Input และ Output ด้วย DTO 
    getProductById: async (req, res) => {
        try{
            const { id } = req.params; // เพิ่มการดึง id จาก req.params
            // ควบคุม Input ให้ส่งเฉพาะข้อมูลที่จำเป็นให้กับ Database
            const product = await productService.getProductById(id);
            
            // ควบคุม Output ให้ส่งเฉพาะข้อมูลที่อยากให้ Client เห็น
            return res.json({ 
                data: {
                    _id: product._id.toString(), // แปลง ObjectId เป็น string
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    created_at: product.created_at
                } });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    },

    // ควบคุม Input และ Output ด้วย DTO 
    createProduct: async (req, res) => {
        const {name, image, price, description, category} = req.body;
        try{
            // ควบคุม Input ให้ส่งเฉพาะข้อมูลที่จำเป็นให้กับ Database
            const newProductData = await productService.createProduct({
                name, 
                image, 
                price, 
                description, 
                category
            });

            // ควบคุม Output ให้ส่งเฉพาะข้อมูลที่อยากให้ Client เห็น
            return res.status(201).json({
                message: `Product Id ${newProductData.insertedId} has been created successfully`,
            });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    },

    // ควบคุม Input และ Output ด้วย DTO 
    updateProduct: async (req, res) => {
        const {name, image, price, description, category} = req.body;
        try{
            // ควบคุม Input ให้ส่งเฉพาะข้อมูลที่จำเป็นให้กับ Database
            await productService.updateProduct(req.params.id, {
                name, 
                image, 
                price, 
                description, 
                category
            });

            // ควบคุม Output ให้ส่งเฉพาะข้อมูลที่อยากให้ Client เห็น
            return res.status(200).json({
                message: `Product Id ${req.params.id} has been updated successfully`,
            });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
        
    },

    // ควบคุม Input และ Output ด้วย DTO 
    deleteProduct: async (req, res) => {
        try{
            // ควบคุม Input ให้ส่งเฉพาะข้อมูลที่จำเป็นให้กับ Database
            await productService.deleteProduct(req.params.id);

            // ควบคุม Output ให้ส่งเฉพาะข้อมูลที่อยากให้ Client เห็น
            return res.status(200).json({
                message: `Product Id ${req.params.id} has been deleted successfully`,
            });
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    },
}

export default productController;