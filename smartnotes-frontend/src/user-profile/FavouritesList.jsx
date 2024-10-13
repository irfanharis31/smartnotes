// FavouritesList.js
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function FavouritesList() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch(
          "https://smartnotes-backend.vercel.app//user-api/users/notes/favorites",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Check if the response is okay
        if (!response.ok) {
          console.error(
            "Failed to fetch favourites:",
            response.status,
            response.statusText
          );
          if (response.status === 401) {
            console.error(
              "Authorization failed: Token might be invalid or expired."
            );
          }
          return;
        }

        const data = await response.json();

        // Debugging to see what data is returned
        console.log("Fetched favourites:", data);

        // Set favourites if data.notes exists, else log a message
        setFavourites(data.notes || []);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Favourites</h2>

      {favourites.length > 0 ? (
        <ul className="list-disc pl-5">
          {favourites.map((note, index) => (
            <li key={index} className="mb-2">
              <Link
                to={`/note/${note.id}`}
                className="text-blue-500 hover:underline"
              >
                {note.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favourite notes available.</p>
      )}

      <Outlet />
    </div>
  );
}

export default FavouritesList;
