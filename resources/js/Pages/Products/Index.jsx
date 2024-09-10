import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from './ProductModal';
import Swal from 'sweetalert2';

const ProductsIndex = ({ title, products, user}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [mode, setMode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await fetch(route('products.destroy', id), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });
                Swal.fire('Deleted!', 'The product has been deleted.', 'success');
                window.location.reload();
            } catch (error) {
                console.error('Failed to delete product:', error);
                Swal.fire('Error!', 'Failed to delete the product. Please try again.', 'error');
            }
        }
    };

    const openModal = (product = null, mode = 'add') => {
        setCurrentProduct(product);
        setMode(mode);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
        setMode('');
    };

    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return product.name.toLowerCase().includes(query) ||
               product.description.toLowerCase().includes(query) ||
               product.price.toString().includes(query) ||
               product.stock.toString().includes(query);
    });

    return (
        <AuthenticatedLayout
            user= {user}
            header={<h1 className="text-3xl font-bold mb-6 text-gray-800">{title}</h1>}
        >
            <div className="container mx-auto px-4 py-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-2">{product.description}</p>
                                <p className="text-gray-800 mb-2">Rp{product.price.toLocaleString()}</p>
                                <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => openModal(product, 'edit')}
                                        className="text-blue-500 hover:text-blue-700 flex items-center"
                                    >
                                        <i className="fas fa-edit mr-1"></i>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700 flex items-center"
                                    >
                                        <i className="fas fa-trash-alt mr-1"></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">No products found</div>
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => openModal(null, 'add')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition ease-in-out duration-150 flex items-center"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add New Product
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal} mode={mode} product={currentProduct} />
            )}
        </AuthenticatedLayout>
    );
};

export default ProductsIndex;
