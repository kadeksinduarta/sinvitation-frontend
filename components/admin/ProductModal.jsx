import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { apiAdmin, getStorageUrl } from '../../utils/api';
import toast from 'react-hot-toast';

export default function ProductModal({ isOpen, onClose, onUpdate, product = null }) {
    if (!isOpen) return null;

    const isEdit = !!product;
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        category: 'wedding',
        price: '',
        description: '',
        preview_link: '',
        status: 'active',
        image: null
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                has_photo: !!product.has_photo,
                price: product.price || '',
                description: product.description || '',
                preview_link: product.preview_link || '',
                status: product.status,
                image: null // Don't set file object on edit initially
            });
            setImagePreview(getStorageUrl(product.image));
        } else {
            // Reset for create
            setFormData({
                name: '',
                category: 'wedding',
                has_photo: false,
                price: '',
                description: '',
                preview_link: '',
                status: 'active',
                image: null
            });
            setImagePreview(null);
        }
    }, [product, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('has_photo', formData.has_photo ? '1' : '0');
        data.append('status', formData.status);
        if (formData.price) data.append('price', formData.price);
        if (formData.description) data.append('description', formData.description);
        if (formData.preview_link) data.append('preview_link', formData.preview_link);
        if (formData.image) data.append('image', formData.image);

        try {
            if (isEdit) {
                await apiAdmin.updateProduct(product.id, data);
                toast.success('Product updated successfully');
            } else {
                await apiAdmin.createProduct(data);
                toast.success('Product created successfully');
            }
            onUpdate();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(isEdit ? 'Failed to update product' : 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" required={!isEdit} />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2">
                                <option value="wedding">Wedding</option>
                                <option value="birthday">Birthday</option>
                                <option value="metatah">Metatah</option>
                            </select>
                        </div>

                        <div className="flex items-center mt-6">
                            <input
                                id="has_photo"
                                name="has_photo"
                                type="checkbox"
                                checked={formData.has_photo}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="has_photo" className="ml-2 block text-sm text-gray-900">
                                Template Isi Foto?
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (IDR)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Optional" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Preview Link</label>
                            <input type="url" name="preview_link" value={formData.preview_link} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
