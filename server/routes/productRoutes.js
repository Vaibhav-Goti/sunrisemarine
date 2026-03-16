const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    exportProductsPDF
} = require('../controllers/productController');

// @route   GET /api/products/export-pdf
// @desc    Export products to PDF (Admin only)
router.get('/export-pdf', auth, exportProductsPDF);

// Configure Multer for local storage (Temporary, switching to Cloudinary later if needed)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// @route   GET /api/products
// @desc    Get all products
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product
router.get('/:id', getProductById);

// @route   POST /api/products
// @desc    Create a product (Admin only)
router.post('/', auth, upload.array('images', 10), createProduct);

// @route   PUT /api/products/:id
// @desc    Update a product (Admin only)
router.put('/:id', auth, upload.array('images', 10), updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
router.delete('/:id', auth, deleteProduct);

module.exports = router;
