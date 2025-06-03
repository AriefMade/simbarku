import 'server-only';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { 
  mysqlTable, 
  text, 
  decimal, 
  int, 
  timestamp, 
  mysqlEnum, 
  serial 
} from 'drizzle-orm/mysql-core';
import { count, eq, like } from 'drizzle-orm';
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

// Definisi skema
export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: mysqlEnum('status', ['active', 'inactive', 'archived']).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  stock: int('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

// Fungsi-fungsi untuk mengakses data
export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Searching
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(like(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  // Pagination
  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}