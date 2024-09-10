import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import PostModal from './PostModal'; 

const PostsPage = ({ title, posts, categories, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredPosts, setFilteredPosts] = useState(posts); 

    const handleOpenModal = (post = null) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

 const handleDelete = (slug) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            
            fetch(`/posts/${slug}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                    setFilteredPosts(filteredPosts.filter(post => post.slug !== slug));
                } else {
                    Swal.fire('Error!', data.message || 'There was an error deleting the post.', 'error');
                }
            })
            .catch(error => {
                Swal.fire('Error!', 'There was an error deleting the post.', 'error');
                console.error('Error:', error);
            });
        }
    });
};

    
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                handleCloseModal();
            }
        };

        const handleClickOutside = (e) => {
            if (e.target.classList.contains('modal-overlay') && isModalOpen) {
                handleCloseModal();
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.content.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredPosts(filtered);
    }, [searchQuery, posts]);

    return (
        <AuthenticatedLayout
            user={user}
            header={<h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>}
        >
            <div className="container mx-auto px-4 py-6">
                <div className="mb-4">
                    <input
                        type="text"
                        id="search-input"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center"
                >
                    <i className="fas fa-plus mr-2"></i>Add New Post
                </button>

                {/* Add/Edit Post Modal */}
                {isModalOpen && (
                    <PostModal
                        post={selectedPost}
                        categories={categories}
                        onClose={handleCloseModal}
                        onSave={() => {
                            handleCloseModal();
                        }}
                    />
                )}

                {/* All Posts Section */}
                <div className="posts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredPosts.map(post => (
                        <div key={post.slug} className="post-item border border-gray-300 rounded-lg p-4 h-96 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
                            {post.image && (
                                <img
                                    src={`/storage/${post.image}`}
                                    alt={post.title}
                                    className="w-full h-40 object-cover mb-4"
                                />
                            )}
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <button
                                    onClick={() => handleOpenModal(post)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
                            </div>
                            <div className="flex justify-end items-center mt-4 space-x-2">
                                <button
                                    onClick={() => handleOpenModal(post)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <i className="fas fa-edit"></i> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post.slug)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PostsPage;
