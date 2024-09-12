import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaEdit } from 'react-icons/fa'; 
import Swal from 'sweetalert2';


const PostModal = ({ post, categories = [], onClose, onSave }) => {
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        content: '',
        category_id: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (post) {
            setFormData({
                slug: post.slug,
                title: post.title,
                content: post.content,
                category_id: post.category_id,
                image: null,
            });
            setImagePreview(post.image ? `/storage/${post.image}` : '');
            setEditMode(true);
        } else {
            setFormData({
                slug: '',
                title: '',
                content: '',
                category_id: '',
                image: null,
            });
            setImagePreview('');
            setEditMode(false);
        }
    }, [post]);

    useEffect(() => {
        if (formData.image) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(formData.image);
        } else if (!post) {
            setImagePreview('');
        }
    }, [formData.image, post]);

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editMode ? `/posts/${formData.slug}` : '/posts';
        const method = editMode ? 'POST' : 'POST';

        const formDataObj = new FormData();

        Object.keys(formData).forEach(key => {
            if (!(key === 'image' && formData[key] === null)) {
                formDataObj.append(key, formData[key]);
            }
        });

        fetch(url, {
            method,
            body: formDataObj,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Error: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                onSave(data.post, editMode); 
                Swal.fire('Success!', `Post has been ${editMode ? 'updated' : 'added'}.`, 'success');
                onClose();
            } else {
                Swal.fire('Error!', data.message || 'An error occurred.', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Error!', error.message || 'An error occurred.', 'error');
            console.error('Error saving post:', error.message || error);
        });
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 myModal">
            <div className="modal bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Post' : 'Add New Post'}</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter the title here..."
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            placeholder="Enter the content here..."
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category_id" className="block text-gray-700">Category</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Image preview"
                                className="w-full h-40 object-cover mt-2"
                            />
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                        >
                            <FaTimes /> {/* Ikon untuk tombol Cancel */}
                            <span>Cancel</span>
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                        >
                            {editMode ? <FaEdit /> : <FaPlus />} 
                            <span>{editMode ? 'Update' : 'Add'} Post</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostModal;
