import React from 'react';
import { FaEdit, FaTrashAlt, FaCartPlus } from 'react-icons/fa';

export default function FishCard({ fish, user, handleAddToCart, handleEdit, handleDelete }) {
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition-all duration-300">
            <img
                src={fish.image}
                alt={fish.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                {/* Name and City Badge in the same line */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{fish.name}</h3>
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {fish.city}
                    </span>
                </div>
                <p className="text-gray-700 mt-2">{fish.description.substring(0, 130)}...</p>
                <div className="mt-4">
                    <p className="text-gray-900 font-bold">
                        Price: {formatRupiah(fish.price_kg)} /kg
                    </p>
                    <p className="text-gray-600">Stock: {fish.stock} kg</p>
                </div>
                {user.role === 'admin' ? (
                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={() => handleEdit(fish)}
                            className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 focus:outline-none flex items-center"
                        >
                            <FaEdit className="mr-2" /> Edit
                        </button>
                        <button
                            onClick={() => handleDelete(fish.id)}
                            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 focus:outline-none flex items-center"
                        >
                            <FaTrashAlt className="mr-2" /> Delete
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => handleAddToCart(fish)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 focus:outline-none mt-4 flex items-center"
                    >
                        <FaCartPlus className="mr-2" /> Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}
