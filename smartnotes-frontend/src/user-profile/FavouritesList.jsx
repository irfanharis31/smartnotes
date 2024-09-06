// FavouritesList.js
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function FavouritesList() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('http://localhost:3000/user-api/users/notes/favorites', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Check if the response is okay
        if (!response.ok) {
          console.error('Failed to fetch favourites:', response.status, response.statusText);
          if (response.status === 401) {
            console.error('Authorization failed: Token might be invalid or expired.');
          }
          return;
        }

        const data = await response.json();

        // Debugging to see what data is returned
        console.log('Fetched favourites:', data);

        // Set favourites if data.notes exists, else log a message
        setFavourites(data.notes || []);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Favourites</h2>
      <ul>
        {favourites.length === 0 ? (
          <p></p>
        ) : (
          favourites.map(note => (
            <li key={note.id} className="flex items-center mb-2">
              <Link to={`/profile/favourites/${note.id}`} className="flex-grow text-[#41b3a2] font-semibold">
                {note.name}
              </Link>
            </li>
          ))
        )}
      </ul>
      <Outlet /> {/* Render NoteDetail as a child */}
    </div>
  );
}

export default FavouritesList;