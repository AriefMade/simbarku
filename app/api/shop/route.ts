import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const kategori = url.searchParams.get('kategori') || '';
        
        let query = db.select({
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
        .where(eq(products.status, 'active'));
        
        // Filter berdasarkan kategori jika parameter ada
        if (kategori) {
            const result = await db.select().from(products).where(eq(products.kategori, kategori));
        }
        
        const result = await query
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