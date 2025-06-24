// Tipe-tipe yang bisa digunakan di client dan server

export interface SelectProduct {
  id: number;
  imageUrl: string;
  name: string;
  status: 'active' | 'inactive' | 'archived';
  price: number | string;
  stock: number;
  availableAt: Date | string;
}

export interface SelectAdmin {
  id_user: number;
  username: string;
  password: string;
}

export interface SelectUser {
  id_user: number;
  nama: string;
  no_telp: number;
  alamat: string;
  email: string;
}

export interface SelectForum {
  id_pesan: number;
  isi_pesan: string;
  gambar_simbar_user: Blob | null;
  kategori: string;
}

export interface SelectTestimoni {
  id_testimoni: number;
  nama: string;
  deskripsi: string;
  rating: number;
}

export interface SelectTransaksi {
  id_transaksi: number;
  id_user: number;  // Sebelumnya 'nama'
  harga: number | string;
  tanggal: Date | string;
  status: 'completed' | 'pending' | 'canceled';
  userName: string | null;
}