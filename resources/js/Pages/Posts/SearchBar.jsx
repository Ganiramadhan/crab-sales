import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => (
    <div className="mb-4">
        <input
            type="text"
            id="search-input"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
);

export default SearchBar;
