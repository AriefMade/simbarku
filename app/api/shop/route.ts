import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db";
import { desc, eq, and, SQL } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const kategori = url.searchParams.get('kategori');
        
        // Buat array kondisi
        const conditions: SQL<unknown>[] = [eq(products.status, 'active')];
        
        // Tambahkan kondisi kategori jika parameter ada dan tidak kosong
        if (kategori && kategori.trim() !== '') {
            conditions.push(eq(products.kategori, kategori));
        }
        
        // Jalankan query dengan semua kondisi yang digabungkan
        const result = await db.select({
            id: products.id,
            name: products.name,
            imageUrl: products.imageUrl,
            price: products.price,
            stock: products.stock,
            kategori: products.kategori,
            status: products.status,
            availableAt: products.availableAt
        })
        .from(products)
        .where(conditions.length > 1 ? and(...conditions) : conditions[0])
        .orderBy(desc(products.availableAt))
        .limit(12);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "api bagian shop error" },
            { status: 500 }
        );
    }
}

