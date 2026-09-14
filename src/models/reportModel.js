import { supabase } from "../config/supabaseClient.js";

export const ReportModel = {
  async getTotalCustomers() {
    // Menggunakan opsi { count: 'exact', head: true } agar Supabase 
    // hanya menghitung jumlah baris tanpa harus mengunduh semua datanya.
    const { count, error } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count;
  }
};
