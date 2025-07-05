'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/ui/ui/card';
import { Button } from '@/components/common/ui/ui/button';
import { Input } from '@/components/common/ui/ui/input';
import { Textarea } from '@/components/common/ui/textarea';
import Link from 'next/link';
import { ChevronRight, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/ui/ui/select';

type ProductData = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  kategori: string;
  status: string;
  description?: string;
};

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const productId = params.id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductData>({
    id: 0,
    name: '',
    imageUrl: '',
    price: 0,
    stock: 0,
    kategori: '',
    status: 'active',
    description: ''
  });

  // Fetch product data on page load
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/admin/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const product = await response.json();
        setFormData({
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          stock: product.stock,
          kategori: product.kategori || '',
          status: product.status || 'active',
          description: product.description || ''
        });
        
        // If product has an image, set the preview
        if (product.imageUrl) {
          setImagePreview(product.imageUrl.startsWith('/') ? product.imageUrl : `/${product.imageUrl}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product data');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fix: Add explicit type annotations
  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare form data for submission including the image if changed
      const submitData = new FormData();
      
      // Add all form fields
      submitData.append('id', formData.id.toString());
      submitData.append('name', formData.name);
      submitData.append('price', formData.price.toString());
      submitData.append('stock', formData.stock.toString());
      submitData.append('kategori', formData.kategori);
      submitData.append('status', formData.status);
      submitData.append('description', formData.description || '');
      
      // Only add the image file if a new one was selected
      if (selectedImage) {
        submitData.append('productImage', selectedImage);
      } else if (formData.imageUrl) {
        // Keep the existing image path
        submitData.append('imageUrl', formData.imageUrl);
      }
      
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        body: submitData, // FormData automatically sets the correct content-type
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }
      
      // Redirect back to products list
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to update product'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/admin" className="hover:underline">Dashboard</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/admin/products" className="hover:underline">Products</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>Edit Product</span>
      </div>
      
      <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Update your product information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="productImage" className="text-sm font-medium">
                Product Image
              </label>
              <div className="flex flex-col gap-4">
                <div 
                  className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload a new image or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG or WEBP (max. 2MB)</p>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    id="productImage" 
                    name="productImage"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                    className="hidden" 
                  />
                </div>
                
                {imagePreview && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Current image:</p>
                    <div className="relative h-40 w-40">
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="h-full w-full object-cover rounded-md" 
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, imageUrl: '' }));
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price (Rp)
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="stock" className="text-sm font-medium">
                  Stock
                </label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="kategori" className="text-sm font-medium">
                  Category
                </label>
                <Select 
                  value={formData.kategori} 
                  onValueChange={(value: string) => handleSelectChange('kategori', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mediaTanaman">Media Tanaman</SelectItem>
                    <SelectItem value="obatPupuk">Obat & Pupuk</SelectItem>
                    <SelectItem value="aksesorisDisplay">Aksesoris & Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: string) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}