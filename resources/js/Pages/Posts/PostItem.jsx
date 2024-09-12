import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PostItem = ({ post, onEdit, onDelete }) => (
    <div
        key={post.slug}
        className="post-item border border-gray-300 rounded-lg p-4 h-96 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg hover:border-blue-500 duration-300 ease-in-out"
    >
        {post.image && (
            <img
                src={`/storage/${post.image}`}
                alt={post.title}
                className="w-full h-40 object-cover mb-4"
            />
        )}
        <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <div className="flex space-x-2">
                <button
                    onClick={() => onEdit(post)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(post.slug)}
                    className="text-red-500 hover:text-red-700"
                >
                    <FaTrash /> 
                </button>
            </div>
        </div>
        <div className="flex-grow">
            <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
        </div>
    </div>
);

export default PostItem;
