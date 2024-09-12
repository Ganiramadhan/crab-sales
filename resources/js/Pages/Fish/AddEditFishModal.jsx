import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaSave, FaTimes } from 'react-icons/fa'; // Import icons

const AddEditFishModal = ({ fish, onClose, onSave }) => {
    const [name, setName] = useState(fish?.name || '');
    const [description, setDescription] = useState(fish?.description || '');
    const [priceKg, setPriceKg] = useState(fish?.price_kg || '');
    const [stock, setStock] = useState(fish?.stock || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (fish) {
            setName(fish.name);
            setDescription(fish.description);
            setPriceKg(fish.price_kg);
            setStock(fish.stock);
            setImagePreview(fish.image || '');
        }
    }, [fish]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.modal-content') === null) {
                onClose();
            }
        };

        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [onClose]);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const formatRupiah = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        // Convert priceKg to string and then replace dots
        const formattedPriceKg = String(priceKg).replace(/\./g, ''); 
        formData.append('price_kg', formattedPriceKg);

        formData.append('stock', stock);
        if (image) {
            formData.append('image', image);
        }
    
        try {
            const url = fish ? `/fish/${fish.id}` : '/fish';
            const method = fish ? 'post' : 'post';
            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
    
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Data has been saved successfully!',
            });
    
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Error saving fish:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while saving the data.',
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative modal-content">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <FaTimes className="h-6 w-6" />
                </button>
                <h2 className="text-xl font-semibold mb-4">{fish ? 'Edit Fish' : 'Add Fish'}</h2>
                <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={formatRupiah(priceKg)}
                    onChange={e => setPriceKg(e.target.value.replace(/\./g, ''))} 
                    placeholder="Price per KG"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    placeholder="Stock"
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full mb-4"
                />
                {imagePreview && (
                    <div className="mb-4">
                        <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                    </div>
                )}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
                    >
                        <FaSave className="mr-2" />
                        {fish ? 'Update' : 'Add'}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none flex items-center"
                    >
                        <FaTimes className="mr-2" />
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEditFishModal;
