import { supabase } from "../config/supabaseClient.js";

export const RestockModel = {
  // Fungsi untuk mencatat restock dan menambah stok produk
  async createRestock(payload) {
    // 1. Simpan catatan restock ke tabel 'restocks'
    const { data: restockData, error: restockError } = await supabase
      .from("restocks")
      .insert([payload])
      .select();

    if (restockError) throw restockError;

    // 2. Ambil stok produk saat ini dari tabel 'products'
    const { data: productData, error: getProductError } = await supabase
      .from("products")
      .select("stock")
      .eq("id", payload.product_id)
      .single();
      
    if (getProductError) throw getProductError;

    // 3. Kalkulasi dan update stok produk (tambahkan stok lama dengan jumlah restock baru)
    const newStock = productData.stock + payload.quantity;
    
    const { error: updateProductError } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", payload.product_id);

    if (updateProductError) throw updateProductError;

    return restockData[0];
  },

  // Fungsi opsional untuk melihat riwayat restock
  async getAll() {
    const { data, error } = await supabase
      .from("restocks")
      .select(`
        id, product_id, supplier_name, quantity, created_at,
        products ( name, sku )
      `);
    if (error) throw error;
    return data;
  }
};
