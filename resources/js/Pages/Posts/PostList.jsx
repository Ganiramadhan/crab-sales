import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, onEdit, onDelete }) => (
    <div className="posts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.length > 0 ? (
            posts.map(post => (
                <PostItem
                    key={post.slug}
                    post={post}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))
        ) : (
            <p className="text-gray-700">No posts found.</p>
        )}
    </div>
);

export default PostList;
