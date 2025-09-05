import productRepository from "../repositories/productRepository.js";

const productService = {
    getAllProducts: async (name, category) => {
        const query = {};
        if (name) {
            query.name = new RegExp(name, "i");
        }
        if (category) {
            query.category = new RegExp(category, "i");
        }
        return await productRepository.findAll(query);
    },

    getProductById: async (id) => {
        return await productRepository.findById(id);
    },

    createProduct: async (productData) => {
        const dataWithTimestamp = {
            ...productData,
            created_at: new Date()
        };
        return await productRepository.create(dataWithTimestamp);
    },

    updateProduct: async (id, productData) => {
        const dataWithTimestamp = {
            ...productData,
            modified_at: new Date()
        };
        return await productRepository.update(id, dataWithTimestamp);
    },

    deleteProduct: async (id) => {
        return await productRepository.delete(id);
    }
}

export default productService;