import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import PostModal from './PostModal';
import SearchBar from './SearchBar';
import PostList from './PostList';
import { FaPlus } from 'react-icons/fa';


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

    const handleSave = (newPost, editMode) => {
        if (editMode) {
            setFilteredPosts(filteredPosts.map(post => post.slug === newPost.slug ? newPost : post));
        } else {
            setFilteredPosts([newPost, ...filteredPosts]);
        }
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
            header={<h2 className="font-semibold text-xl text-gray-600 leading-tight">{title}</h2>}
        >
            <div className="container mx-auto px-4 py-6">
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center"
                >
                    <FaPlus className="mr-2" /> Add New Post
                </button>

                {isModalOpen && (
                    <PostModal
                        post={selectedPost}
                        categories={categories}
                        onClose={handleCloseModal}
                        onSave={handleSave}
                    />
                )}

                <PostList posts={filteredPosts} onEdit={handleOpenModal} onDelete={handleDelete} />
            </div>
        </AuthenticatedLayout>
    );
};

export default PostsPage;
