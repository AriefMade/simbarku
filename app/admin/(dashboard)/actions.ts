'use server';

import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData): Promise<void> {
  const idValue = formData.get('id');
  const id = typeof idValue === 'string' ? Number(idValue) : 0;

  if (isNaN(id) || id === 0) {
    throw new Error('Invalid product ID');
  }

  // await deleteProductById(id);
  // revalidatePath('/');
}
