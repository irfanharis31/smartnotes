import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLogo from "../assets/userlogo.svg";
import homeicon from "../assets/home.svg";
import favouritesicon from "../assets/favourites.svg";
import tagicon from "../assets/tagicon.svg";
import notesicon from "../assets/notesicon.svg";
import trashicon from "../assets/trashicon.svg";
import SearchBar from "./SearchBar";

function Sidebar() {
  const [showNotesDropdown, setShowNotesDropdown] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showTrashDropdown, setShowTrashDropdown] = useState(false);
  const [notes, setNotes] = useState([]);
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [trash, setTrash] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [noteNameInput, setNoteNameInput] = useState("");
  const [username, setUsername] = useState("Loading...");
  const [isCreating, setIsCreating] = useState(false);

  const toggleNotesDropdown = () => {
    setShowNotesDropdown(!showNotesDropdown);
  };

  const toggleFavoritesDropdown = () => {
    setShowFavoritesDropdown(!showFavoritesDropdown);
  };

  const toggleTagsDropdown = () => {
    setShowTagsDropdown(!showTagsDropdown);
  };

  const toggleTrashDropdown = () => {
    setShowTrashDropdown(!showTrashDropdown);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch username
        const userResponse = await fetch(
          "http://localhost:3000/user-api/users/me",
          { headers }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUsername(userData.username);
        } else {
          console.error("Failed to fetch user data");
        }

        // Fetch notes
        const notesResponse = await fetch(
          "http://localhost:3000/user-api/users/notes",
          { headers }
        );

        if (notesResponse.ok) {
          const notesData = await notesResponse.json();
          setNotes(notesData);
        } else {
          console.error("Failed to fetch notes");
        }

        // Fetch favorite notes
        const favoritesResponse = await fetch(
          "http://localhost:3000/user-api/users/notes/favorites",
          { headers }
        );

        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          setFavoriteNotes(favoritesData);
        } else {
          console.error("Failed to fetch favorite notes");
        }

        // Fetch tags
        const tagsResponse = await fetch(
          "http://localhost:3000/user-api/users/tags",
          { headers }
        );

        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setTags(tagsData);
        } else {
          console.error("Failed to fetch tags");
        }

        // Fetch trash
        const trashResponse = await fetch(
          "http://localhost:3000/user-api/users/notes/recycle-bin",
          { headers }
        );

        if (trashResponse.ok) {
          const trashData = await trashResponse.json();
          setTrash(trashData);
        } else {
          console.error("Failed to fetch trash");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNewNote = () => {
    setIsCreating(true);
    setNoteNameInput(""); // Clear input field for new note creation
  };

  const handleCreateNote = async () => {
    if (!noteNameInput.trim()) return;

    const createdDate = new Date().toISOString();
    const newNote = {
      noteId: createdDate,
      title: noteNameInput, // Set title from input
      content: "", // Initialize with empty content
      tags: [] // Initialize with empty tags array
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing");
        return;
      }

      const response = await fetch("http://localhost:3000/user-api/users/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote), // Send the newNote object directly
      });

      if (response.ok) {
        const notesData = await response.json();
        setNotes((prevNotes) => [...prevNotes, notesData.note]);
        setIsCreating(false);
        setNoteNameInput(""); // Reset input field after creation
      } else {
        console.error("Failed to save note to backend");
      }
    } catch (error) {
      console.error("Error saving note to backend:", error);
    }
  };

  const handleRenameNote = async (id) => {
    if (!noteNameInput.trim()) return;

    const updatedNotes = notes.map((note) =>
      note.noteId === id ? { ...note, title: noteNameInput } : note
    );
    setNotes(updatedNotes);
    setIsEditing(null);
    setNoteNameInput("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/user-api/users/notes",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notes: updatedNotes }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Failed to update note in backend:",
          errorData.message || response.statusText
        );
      } else {
        console.log("Note updated successfully");
      }
    } catch (error) {
      console.error("Error updating note in backend:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <div className="flex items-center mt-6">
          <div className="w-16 h-16 overflow-hidden">
            <img
              src={UserLogo}
              width="45px"
              alt="Profile"
              className="rounded-full bg-[#41b3a2] py-2 px-2.5"
            />
          </div>
          <div className="pb-5">
            <h1 className="text-[#000000] text-2xl font-semibold">
              {username}
            </h1>
          </div>
        </div>

        <SearchBar
          onSearch={(searchTerm) => console.log("Searching for:", searchTerm)}
        />

        <button
          onClick={handleNewNote}
          className="w-full mt-4 py-2 bg-[#41b3a2] text-white font-semibold rounded-md shadow-md hover:bg-[#33a89f] transition duration-300"
        >
          New Note
        </button>

        <div className="flex flex-col p-0 mt-4 ms-7">
          <Link
            to="/profile/home"
            className="flex text-xl font-semibold text-[#9e9e9e]"
          >
            <img src={homeicon} className="w-5 me-2" alt="Home Icon" /> Home
          </Link>
          <button
            onClick={toggleFavoritesDropdown}
            className="flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]"
          >
            <img
              src={favouritesicon}
              className="w-4 me-2 pt-2"
              alt="Favourites Icon"
            />{" "}
            Favourites
          </button>
          {showFavoritesDropdown && (
            <ul className="pl-4 text-md font-semibold text-[#9e9e9e]">
              {favoriteNotes.length > 0 ? (
                favoriteNotes.map((note) => (
                  <li key={note.id} className="flex items-center">
                    <Link
                      to={`/profile/favourites/${note.id}`}
                      className="flex-grow"
                    >
                      {note.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No favorite notes available</li>
              )}
            </ul>
          )}
          <button
            onClick={toggleNotesDropdown}
            className="flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]"
          >
            <img src={notesicon} className="w-4 me-2 pt-2" alt="Notes Icon" />{" "}
            Notes
          </button>
          {showNotesDropdown && (
            <ul className="pl-4 text-md font-semibold text-[#9e9e9e]">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <li key={note.noteId} className="flex items-center">
                    {isEditing === note.noteId ? (
                      <>
                        <input
                          value={noteNameInput}
                          onChange={(e) => setNoteNameInput(e.target.value)}
                          className="flex-grow px-2 py-1 border rounded"
                        />
                        <button
                          onClick={() => handleRenameNote(note.noteId)}
                          className="px-2 py-1 ml-1 bg-green-500 text-white rounded"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/profile/notes/${note.noteId}`}
                          className="flex-grow"
                        >
                          {note.title}
                        </Link>
                        <button
                          onClick={() => {
                            setIsEditing(note.noteId);
                            setNoteNameInput(note.title); // Populate input with current note title
                          }}
                          className="px-2 py-1 ml-1 bg-blue-500 text-white rounded"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <li>No notes available</li>
              )}
            </ul>
          )}

          {/* Tags Dropdown */}
          <button
            onClick={toggleTagsDropdown}
            className="flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]"
          >
            <img src={tagicon} className="w-4 me-2 pt-2" alt="Tags Icon" /> Tags
          </button>
          {showTagsDropdown && (
            <ul className="pl-4 text-md font-semibold text-[#9e9e9e]">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <li key={tag} className="flex items-center">
                    <Link to={`/profile/tags/${tag}`} className="flex-grow">
                      {tag}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No tags available</li>
              )}
            </ul>
          )}

          {/* Trash Dropdown */}
          <button
            onClick={toggleTrashDropdown}
            className="flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]"
          >
            <img src={trashicon} className="w-4 me-2 pt-2" alt="Trash Icon" />{" "}
            Trash
          </button>
          {showTrashDropdown && (
            <ul className="pl-4 text-md font-semibold text-[#9e9e9e]">
              {trash.length > 0 ? (
                trash.map((note) => (
                  <li key={note.id} className="flex items-center">
                    <Link to={`/profile/trash/${note.id}`} className="flex-grow">
                      {note.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No notes in trash</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;