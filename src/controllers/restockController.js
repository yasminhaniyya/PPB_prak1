import { RestockModel } from "../models/restockModel.js";

export const RestockController = {
  async create(req, res) {
    try {
      const { product_id, supplier_name, quantity } = req.body;

      // 1. Validasi input: Pastikan semua data diisi
      if (!product_id || !supplier_name || !quantity) {
        return res.status(400).json({ 
          error: "product_id, supplier_name, dan quantity wajib diisi!" 
        });
      }

      // 2. Validasi input: Pastikan jumlah barang di atas 0
      if (quantity <= 0) {
        return res.status(400).json({ 
          error: "Jumlah barang yang masuk (quantity) harus lebih dari 0" 
        });
      }

      // 3. Panggil Model untuk memproses restock dan update produk
      const restock = await RestockModel.createRestock({
        product_id,
        supplier_name,
        quantity
      });

      res.status(201).json({
        message: "Restock berhasil dicatat, stok produk telah otomatis bertambah!",
        data: restock
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const restocks = await RestockModel.getAll();
      res.json(restocks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
