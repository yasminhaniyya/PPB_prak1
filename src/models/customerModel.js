import { supabase } from "../config/supabaseClient.js";
export const CustomerModel = {
async getAll(name, page = 1, limit = 10) {
let query = supabase.from("customers").select("*");

// Tambahkan kondisi filter jika ada pencarian berdasarkan nama
if (name) {
query = query.ilike("name", `%${name}%`);
}

// Hitung range baris data untuk pagination Supabase (indeks dimulai dari 0)
const from = (page - 1) * limit;
const to = from + limit - 1;

// Terapkan pagination pada query
query = query.range(from, to);

const { data, error } = await query;
if (error) throw error;
return data;
},
async getById(id) {
const { data, error } = await supabase
.from("customers")
.select("*")
.eq("id", id)
.single();
if (error) throw error;
return data;
},
async create(customer) {

const { data, error } = await supabase
.from("customers")
.insert([customer])
.select()
.single();
if (error) throw error;
return data;
},
async update(id, customer) {
const { data, error } = await supabase
.from("customers")
.update(customer)
.eq("id", id)
.select()
.single();
if (error) throw error;
return data;
},
async remove(id) {
const { error } = await supabase.from("customers").delete().eq("id",
id);
if (error) throw error;
return { message: "Customer deleted successfully" };
},
};