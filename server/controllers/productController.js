const Product = require('../models/Product');
const puppeteer = require('puppeteer');
const path = require('path');

// @desc    Get all products
const getProducts = async (req, res) => {
    try {
        let { page, limit, category, search } = req.query;
        
        // If no pagination/filter params are provided, return all products
        if (!page && !limit && !category && !search) {
            const products = await Product.find().sort({ createdAt: -1 });
            return res.json(products);
        }

        let query = {};
        if (category && category !== 'all') {
             const categoryName = category.replace(/-/g, ' ');
             // Use case-insensitive regex match for category
             query.category = { $regex: new RegExp(`^${categoryName}$`, 'i') };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 6;
        const startIndex = (pageNum - 1) * limitNum;

        const total = await Product.countDocuments(query);
        const products = await Product.find(query).sort({ createdAt: -1 }).skip(startIndex).limit(limitNum);

        res.json({
            products,
            currentPage: pageNum,
            totalPages: Math.ceil(total / limitNum) || 1,
            totalProducts: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product (Admin only)
const createProduct = async (req, res) => {
    try {
        const { name, description, category, specifications } = req.body;

        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const newProduct = new Product({
            name,
            description,
            category,
            images,
            specifications: specifications ? JSON.parse(specifications) : {}
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a product (Admin only)
const updateProduct = async (req, res) => {
    try {
        const { name, description, category, specifications, existingImages } = req.body;

        let updateData = {
            name,
            description,
            category,
            specifications: specifications ? JSON.parse(specifications) : undefined
        };

        // Parse existing images that were NOT removed on the frontend
        let finalImages = existingImages ? JSON.parse(existingImages) : [];

        // Add newly uploaded images on top
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            finalImages = [...finalImages, ...newImages];
        }

        updateData.images = finalImages;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Export products to PDF
const exportProductsPDF = async (req, res) => {
    try {
        const products = await Product.find().sort({ category: 1, name: 1 });
        
        let tableRows = '';
        products.forEach((p, index) => {
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${p.name}</td>
                    <td>${p.category}</td>
                    <td>${p.description.substring(0, 100)}${p.description.length > 100 ? '...' : ''}</td>
                </tr>
            `;
        });

        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Products List</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
                        .header { border-bottom: 2px solid #004d99; margin-bottom: 30px; padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
                        h1 { color: #004d99; margin: 0; font-size: 24px; }
                        .date { color: #666; font-size: 14px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #e0e0e0; padding: 12px; text-align: left; }
                        th { background-color: #004d99; color: white; font-weight: 600; text-transform: uppercase; font-size: 12px; }
                        tr:nth-child(even) { background-color: #f9fbfd; }
                        .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #eee; padding-top: 10px; }
                        .summary { margin-top: 20px; font-weight: 600; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Sunrise Marine Enterprise</h1>
                        <div class="date">Report Date: ${new Date().toLocaleDateString()}</div>
                    </div>
                    <h2 style="text-align: center; color: #444;">Official Product Catalog</h2>
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 40px;">#</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Description Snippet</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                    <div class="summary">Total Products: ${products.length}</div>
                    <div class="footer">
                        © ${new Date().getFullYear()} Sunrise Marine Enterprise. Confidential Document.
                    </div>
                </body>
            </html>
        `;

        const browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({ 
            format: 'A4', 
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });
        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=products-catalog.pdf",
            "Content-Length": pdf.length
        });
        res.send(pdf);

    } catch (error) {
        console.error('PDF Export Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    exportProductsPDF
};
