export function productValidation(req, res, next) {
    const { name, price, image, description, category } = req.body;

    if(!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: "Name is required and must be a string" });
    }
    if(!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: "Price is required and must be a number" });
    }
    if(!image || typeof image !== 'string' || image.trim().length === 0) {
        return res.status(400).json({ message: "Image is required and must be a string" });
    }
    if(!description || typeof description !== 'string' || description.trim().length === 0) {
        return res.status(400).json({ message: "Description is required and must be a string" });
    }
    if(description.trim().length < 10) {
        return res.status(400).json({ message: "Description must be at least 10 characters long" });
    }
    if(!category || typeof category !== 'string' || category.trim().length === 0) {
        return res.status(400).json({ message: "Category is required and must be a string" });
    }
    
    next();
}