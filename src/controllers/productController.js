import { ProductModel } from "../models/productModel.js";
export const ProductController = {
async getAll(req, res) {
try {
const { category_id } = req.query;
const products = await ProductModel.getAll(category_id);
res.json(products);
} catch (err) {
res.status(500).json({ error: err.message });
}
},
async getById(req, res) {
try {
const product = await ProductModel.getById(req.params.id);
res.json(product);
} catch (err) {
res.status(404).json({ error: err.message });
}
},
async create(req, res) {
try {
const { price, stock } = req.body;

// Penanganan error manual: Harga tidak boleh kurang dari 0
if (price !== undefined && price < 0) {
return res.status(400).json({ error: "Harga (price) tidak boleh kurang dari 0" });
}

// Penanganan error manual: Stok tidak boleh kurang dari 0
if (stock !== undefined && stock < 0) {
return res.status(400).json({ error: "Stok (stock) tidak boleh kurang dari 0" });
}

const product = await ProductModel.create(req.body);
res.status(201).json(product);
} catch (err) {
res.status(400).json({ error: err.message });
}
},
async update(req, res) {
try {
const product = await ProductModel.update(req.params.id, req.body);
res.json(product);
} catch (err) {
res.status(400).json({ error: err.message });

}
},
async remove(req, res) {
try {
await ProductModel.remove(req.params.id);
res.json({ message: "Product deleted successfully" });
} catch (err) {
res.status(400).json({ error: err.message });
}
},
};