const Category = require('../models/Category');

// @desc    Get all categories
const getCategories = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        
        // If no pagination params, return all (for dropdowns)
        if (!page && !limit && !search) {
            const categories = await Category.find().sort({ name: 1 });
            return res.json(categories);
        }

        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;

        const total = await Category.countDocuments(query);
        const categories = await Category.find(query)
            .sort({ name: 1 })
            .skip(skip)
            .limit(limitNum);

        res.json({
            categories,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum) || 1,
            totalCategories: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        const newCategory = new Category({ name, slug, description, image });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a category
const updateCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const slug = name ? name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : undefined;
        
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, slug, description, image },
            { new: true }
        );
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a category
const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
