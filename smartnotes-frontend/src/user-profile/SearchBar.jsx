import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        placeholder="Search notes, favorites, or tags..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41b3a2] focus:border-transparent"
      />
    </div>
  );
}

export default SearchBar;
