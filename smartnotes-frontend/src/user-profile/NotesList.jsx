import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

function NotesList() {
  // Mock data for notes, favorites, and tags (Replace with actual data fetching)
  const [notes, setNotes] = useState([
    { id: 1, title: 'Meeting Notes', content: 'Meeting with team...', tags: ['work'], favorite: true },
    { id: 2, title: 'Shopping List', content: 'Buy groceries...', tags: ['personal'], favorite: false },
    { id: 3, title: 'Project Ideas', content: 'Brainstorm project ideas...', tags: ['work'], favorite: false },
  ]);

  const [filteredNotes, setFilteredNotes] = useState(notes);

  // Function to filter notes based on search term
  const filterNotes = (searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const results = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerCaseTerm) ||
        note.content.toLowerCase().includes(lowerCaseTerm) ||
        note.tags.some((tag) => tag.toLowerCase().includes(lowerCaseTerm)) ||
        (lowerCaseTerm === 'favorites' && note.favorite)
    );
    setFilteredNotes(results);
  };

  return (
    <div>
      {/* Search Bar */}
      <SearchBar onSearch={filterNotes} />

      {/* Displaying the Filtered Notes */}
      <div className="grid gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <div className="mt-2">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm bg-gray-200 rounded-full mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            {note.favorite && (
              <span className="inline-block mt-2 px-2 py-1 text-sm bg-yellow-200 rounded-full">
                Favorite
              </span>
            )}
          </div>
        ))}
        {filteredNotes.length === 0 && (
          <p className="text-center text-gray-500">No matching notes found.</p>
        )}
      </div>
    </div>
  );
}

export default NotesList;
