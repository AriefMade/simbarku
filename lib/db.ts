import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { 
  mysqlTable, 
  text, 
  decimal, 
  int, 
  timestamp, 
  mysqlEnum, 
  serial,
  varchar,
  binary,
  date
} from 'drizzle-orm/mysql-core';
import { count, eq, like, desc, sql, inArray } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';


// Konfigurasi koneksi MySQL menggunakan variabel lingkungan
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'simbarku',
});

export const db = drizzle(connection);

// Definisi tabel products
export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(), // Sesuaikan nama field
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: int("stock").notNull(),
  kategori: varchar("kategori", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["active", "inactive", "archived"]).default("active"),
  availableAt: timestamp("available_at").notNull() // Sesuaikan nama field
});

// Definisi tabel admin
export const admins = mysqlTable('admin', {
  id_user: int('id_user').primaryKey().autoincrement(),
  username: varchar('username', { length: 20 }).notNull(),
  password: varchar('password', { length: 15 }).notNull()
});

// Definisi tabel forum
export const forums = mysqlTable('forum', {
  idPesan: int('id_pesan').primaryKey().autoincrement(),
  isiPesan: text('isi_pesan').notNull(),
  gambarSimbarUser: binary('gambar_simbar_user'),
  kategori: varchar('kategori', { length: 255 }).notNull()
});

// Definisi tabel testimoni
export const testimonials = mysqlTable('testimoni', {
  idTestimoni: int('id_testimoni').primaryKey().autoincrement(),
  nama: text('nama').notNull(),
  deskripsi: text('deskripsi').notNull(),
  rating: int('rating').notNull()
});

// Definisi tabel transaksi
export const transactions = mysqlTable('transaksi', {
  id_transaksi: int('id_transaksi').primaryKey().autoincrement(),
  id_user: int('id_user').notNull().references(() => users.idUser),
  harga: int('harga').notNull(),
  tanggal: date('tanggal').notNull(),
  status: mysqlEnum('status', ['completed', 'pending', 'canceled']).notNull().default('pending')
});

// Definisi tabel user
export const users = mysqlTable('user', {
  idUser: int('id_user').primaryKey().autoincrement(),
  nama: varchar('nama', { length: 30 }).notNull(),
  no_telp: int('no_telp').notNull(),
  alamat: text('alamat').notNull(),
  email: text('email').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export type SelectAdmin = typeof admins.$inferSelect;
export type SelectUser = typeof users.$inferSelect;
export type SelectForum = typeof forums.$inferSelect;
export type SelectTestimoni = typeof testimonials.$inferSelect;
export type SelectTransaksi = typeof transactions.$inferSelect;

export const insertProductSchema = createInsertSchema(products);

// Fungsi untuk mengakses products
export async function getProducts(
  search: string,
  offset: number = 0
): Promise<{
  products: SelectProduct[];
  newOffset: number;
  totalProducts: number;
}> {
  try {
    const productsPerPage = 5;
    // Searching
    if (search) {
      const filteredProducts = await db
        .select()
        .from(products)
        .where(like(products.name, `%${search}%`))
        .limit(1000);
      
      return {
        products: filteredProducts,
        newOffset: offset,
        totalProducts: filteredProducts.length
      };
    }

    // Pagination
    const totalProductsResult = await db.select({ count: count() }).from(products);
    const totalCount = Number(totalProductsResult[0].count);
    
    const moreProducts = await db
      .select()
      .from(products)
      .limit(productsPerPage)
      .offset(offset);
    
    const newOffset = moreProducts.length === productsPerPage ? offset + productsPerPage : null;

    return {
      products: moreProducts,
      newOffset : offset,
      totalProducts: totalCount
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      newOffset: 0,
      totalProducts: 0
    };
  }
}

// Fungsi untuk delete product
export async function deleteProductById(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error };
  }
}

// Fungsi untuk mendapatkan admin berdasarkan username
export async function getAdminByUsername(username: string) {
  try {
    const result = await db
      .select()
      .from(admins)
      .where(eq(admins.username, username))
      .limit(1);
    
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching admin:", error);
    return null;
  }
}

// Fungsi untuk mendapatkan users
export async function getUsers(offset: number = 0): Promise<{
  users: SelectUser[];
  totalUsers: number;
}> {
  try {
    const usersPerPage = 10;
    const totalUsersResult = await db.select({ count: count() }).from(users);
    const usersList = await db
      .select()
      .from(users)
      .limit(usersPerPage)
      .offset(offset);
    
    return {
      users: usersList,
      totalUsers: Number(totalUsersResult[0].count)
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      users: [],
      totalUsers: 0
    };
  }
}

// Fungsi untuk mendapatkan transaksi
export async function getTransactions(offset: number = 0): Promise<{
  transactions: SelectTransaksi[];
  totalTransactions: number;
}> {
  try {
    const transactionsPerPage = 10;
    const totalTransactionsResult = await db.select({ count: count() }).from(transactions);
    
    const transactionsList = await db
      .select()
      .from(transactions)
      .limit(transactionsPerPage)
      .offset(offset)
      .orderBy(desc(transactions.tanggal));
    
    return {
      transactions: transactionsList.map(t => ({
        ...t,
        status: t.status || 'pending' // Pastikan selalu ada status
      })),
      totalTransactions: Number(totalTransactionsResult[0].count)
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      transactions: [],
      totalTransactions: 0
    };
  }
}

// Fungsi untuk mendapatkan transaksi dengan data user
export async function getTransactionsWithUserData(offset: number = 0): Promise<{
  transactions: (SelectTransaksi & { userName: string })[];
  totalTransactions: number;
}> {
  try {
    const transactionsPerPage = 10;
    const totalTransactionsResult = await db.select({ count: count() }).from(transactions);
    
    // Query dengan join untuk mendapatkan nama user
    const result = await db
      .select({
        id_transaksi: transactions.id_transaksi,
        id_user: transactions.id_user,
        harga: transactions.harga,
        tanggal: transactions.tanggal,
        status: transactions.status,
        userName: users.nama
      })
      .from(transactions)
      .leftJoin(users, eq(transactions.id_user, users.idUser))
      .limit(transactionsPerPage)
      .offset(offset)
      .orderBy(desc(transactions.tanggal));
    
    return {
      transactions: result.map(tx => ({
        ...tx,
        userName: tx.userName || 'Pengguna Tidak Dikenal'
      })),
      totalTransactions: Number(totalTransactionsResult[0].count)
    };
  } catch (error) {
    console.error("Error fetching transactions with user data:", error);
    return {
      transactions: [],
      totalTransactions: 0
    };
  }
}

// Fungsi untuk menginisialisasi database jika diperlukan
export async function initDatabase() {
  try {
    // Database sudah ada dan tabel-tabel sudah dibuat sesuai skema SQL yang diberikan
    // Fungsi ini untuk memastikan koneksi berjalan dengan baik
    const testConnection = await db.select().from(products).limit(1);
    console.log('Database connection successful');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

// Tambahkan fungsi ini ke file db.ts
export async function updateAdminPassword(id: number, hashedPassword: string) {
  try {
    await db
      .update(admins)
      .set({ password: hashedPassword })
      .where(eq(admins.id_user, id));
    
    return true;
  } catch (error) {
    console.error("Error updating admin password:", error);
    throw error;
  }
}

// Fungsi untuk mendapatkan data analytics transaksi
export async function getTransactionAnalytics() {
  try {
    // Data transaksi per bulan (untuk 12 bulan terakhir)
    const monthlyTransactions = await db.select({
      month: sql`DATE_FORMAT(tanggal, '%Y-%m')`,
      total: sql`COUNT(id_transaksi)`,
      revenue: sql`SUM(harga)`,
    })
    .from(transactions)
    .groupBy(sql`DATE_FORMAT(tanggal, '%Y-%m')`)
    .orderBy(sql`DATE_FORMAT(tanggal, '%Y-%m')`)
    .limit(12);
    
    // Data transaksi per status
    const transactionsByStatus = await db.select({
      status: transactions.status,
      count: count(),
      revenue: sql`SUM(harga)`,
    })
    .from(transactions)
    .groupBy(transactions.status);
    
    // Data top 5 pelanggan dengan transaksi tertinggi
    const topCustomers = await db.select({
      id_user: transactions.id_user,
      totalPurchases: count(),
      totalSpent: sql`SUM(harga)`,
    })
    .from(transactions)
    .where(eq(transactions.status, 'completed'))
    .groupBy(transactions.id_user)
    .orderBy(desc(sql`SUM(harga)`))
    .limit(5);
    
    return {
      monthlyTransactions,
      transactionsByStatus,
      topCustomers
    };
  } catch (error) {
    console.error("Error fetching transaction analytics:", error);
    return {
      monthlyTransactions: [],
      transactionsByStatus: [],
      topCustomers: []
    };
  }
}

// Fungsi untuk mendapatkan data user berdasarkan array ID
export async function getUsersByIds(userIds: number[]) {
  try {
    if (userIds.length === 0) return [];
    
    const usersList = await db.select()
      .from(users)
      .where(inArray(users.idUser, userIds));
    
    return usersList;
  } catch (error) {
    console.error("Error fetching users by IDs:", error);
    return [];
  }
}

// Tambahkan fungsi ini di file db.ts

// Fungsi untuk mendapatkan semua user (customers)
export async function getAllUsers(offset = 0, limit = 10) {
  try {
    const usersList = await db.select()
      .from(users)
      .limit(limit)
      .offset(offset);
    
    const totalUsers = await db.select({ count: count() })
      .from(users);
    
    return {
      users: usersList,
      totalUsers: totalUsers[0].count
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: [], totalUsers: 0 };
  }
}

// Fungsi untuk mendapatkan transaksi untuk user tertentu
export async function getTransactionsByUser(userId: number) {
  try {
    const userTransactions = await db.select()
      .from(transactions)
      .where(eq(transactions.id_user, userId));
    
    return userTransactions;
  } catch (error) {
    console.error(`Error fetching transactions for user ${userId}:`, error);
    return [];
  }
}

// Tambahkan fungsi untuk mendapatkan user berdasarkan ID

export async function getById(userId: number) {
  try {
    const result = await db.select()
      .from(users)
      .where(eq(users.idUser, userId))
      .limit(1);
    
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
}


export const detail_transaksi = mysqlTable('detail_transaksi', {
  id_detail: int('id_detail').primaryKey().autoincrement(),
  id_transaksi: int('id_transaksi').notNull().references(() => transactions.id_transaksi),
  id_product: int('id_product').notNull().references(() => products.id),
  qty: int('qty').notNull(),
  harga_satuan: decimal('harga_satuan', { precision: 10, scale: 2 }).notNull()
});