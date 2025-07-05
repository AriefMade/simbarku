'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/ui/ui/card';
import { Button } from '@/components/common/ui/ui/button';
import { Input } from '@/components/common/ui/ui/input';
import { Textarea } from '@/components/common/ui/textarea';
import Link from 'next/link';
import { ChevronRight, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/ui/ui/select';

// Define the form data type explicitly
type FormData = {
  name: string;
  price: string;
  stock: string;
  kategori: string;
  status: string;
  description: string;
};

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    stock: '',
    kategori: '',
    status: 'active', // Default status is active
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare form data for submission including the image
      const submitData = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      
      // Add the image file if selected
      if (selectedImage) {
        submitData.append('productImage', selectedImage);
      }
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: submitData, // FormData automatically sets the correct content-type
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add product');
      }
      
      // Redirect back to products list
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to add product'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/admin" className="hover:underline">Dashboard</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/admin/products" className="hover:underline">Products</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>New Product</span>
      </div>
      
      <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Add a new product to your inventory</CardDescription>
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
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
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
                    <p className="text-sm text-gray-500 mb-1">Preview:</p>
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
                  onValueChange={(value: string) => handleSelectChange('kategori', value)} 
                  required
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
                <p className="text-sm text-gray-500">Product will be active by default</p>
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
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}