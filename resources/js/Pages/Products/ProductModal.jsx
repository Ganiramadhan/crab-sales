import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Modal = ({ isOpen, onClose, mode, product }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        if (mode === 'edit' && product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: ''
            });
        }
    }, [mode, product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = mode === 'edit'
            ? route('products.update', product.id)
            : route('products.store');
        const method = mode === 'edit' ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(formData),
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: mode === 'edit' ? 'Product updated successfully!' : 'Product added successfully!'
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to save product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save the product. Please try again.'
            });
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOutsideClick}
        >
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-semibold mb-4">{mode === 'edit' ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter product price"
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Enter product stock"
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            {mode === 'edit' ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
