import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLogo from "../assets/userlogo.svg";
import homeicon from "../assets/home.svg";
import favouritesicon from "../assets/favourites.svg";
import tagicon from "../assets/tagicon.svg";
import notesicon from "../assets/notesicon.svg";
import trashicon from "../assets/trashicon.svg";
import SearchBar from "./SearchBar";
import { FaEllipsisV } from "react-icons/fa"; // Three dots icon
import { MdKeyboardArrowDown } from "react-icons/md"; // Down arrow icon

function Sidebar() {
  const [showNotesDropdown, setShowNotesDropdown] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showTagCategoriesDropdown, setShowTagCategoriesDropdown] = useState(false);
  const [showTrashDropdown, setShowTrashDropdown] = useState(false);
  const [notes, setNotes] = useState([]);
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [trash, setTrash] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [noteNameInput, setNoteNameInput] = useState("");
  const [username, setUsername] = useState("Loading...");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedTrashItemId, setSelectedTrashItemId] = useState(null);
  const [showPersonalTagNotes, setShowPersonalTagNotes] = useState(false);
  const [showWorkTagNotes, setShowWorkTagNotes] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const toggleNotesDropdown = () => setShowNotesDropdown(!showNotesDropdown);
  const toggleFavoritesDropdown = () => setShowFavoritesDropdown(!showFavoritesDropdown);
  const toggleTagsDropdown = () => setShowTagsDropdown(!showTagsDropdown);
  const toggleTagCategoriesDropdown = () => setShowTagCategoriesDropdown(!showTagCategoriesDropdown);
  const toggleTrashDropdown = () => setShowTrashDropdown(!showTrashDropdown);
  const toggleLogoutMenu = () => setShowLogoutMenu(!showLogoutMenu);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page or home page
  };

  const handleConfirmLogout = () => {
    setConfirmLogout(true);
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false);
    setShowLogoutMenu(false);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const userResponse = await fetch("http://localhost:3000/user-api/users/me", { headers });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUsername(userData.username);
        } else {
          console.error("Failed to fetch user data");
        }

        const notesResponse = await fetch("http://localhost:3000/user-api/users/notes", { headers });
        if (notesResponse.ok) {
          const notesData = await notesResponse.json();
          setNotes(notesData);
          setFilteredNotes(notesData); // Initialize filteredNotes with all notes
        } else {
          console.error("Failed to fetch notes");
        }

        const favoritesResponse = await fetch("http://localhost:3000/user-api/users/notes/favorites", { headers });
        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          setFavoriteNotes(favoritesData);
        } else {
          console.error("Failed to fetch favorite notes");
        }

        const tagsResponse = await fetch("http://localhost:3000/user-api/users/tags", { headers });
        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          setTags(tagsData);
        } else {
          console.error("Failed to fetch tags");
        }

        const trashResponse = await fetch("http://localhost:3000/user-api/users/notes/recycle-bin", { headers });
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

  useEffect(() => {
    if (selectedTag) {
      const filtered = notes.filter(note => note.tags.includes(selectedTag));
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [selectedTag, notes]);

  const handleNewNote = () => {
    setIsCreating(true);
    setNoteNameInput("");
  };

  const handleCreateNote = async () => {
    if (!noteNameInput.trim()) return;

    const createdDate = new Date().toISOString();
    const newNote = { noteId: createdDate, title: noteNameInput, content: "", tags: [] };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing");
        return;
      }

      const response = await fetch("http://localhost:3000/user-api/users/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const notesData = await response.json();
        setNotes(prevNotes => [...prevNotes, notesData.note]);
        setIsCreating(false);
        setNoteNameInput("");
      } else {
        console.error("Failed to save note to backend");
      }
    } catch (error) {
      console.error("Error saving note to backend:", error);
    }
  };

  const handleRenameNote = async (id) => {
    if (!noteNameInput.trim()) return;

    const updatedNotes = notes.map(note =>
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

      const response = await fetch(`http://localhost:3000/user-api/users/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: noteNameInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update note in backend:", errorData.message || response.statusText);
      } else {
        console.log("Note updated successfully");
      }
    } catch (error) {
      console.error("Error updating note in backend:", error);
    }
  };

  const handleRestoreNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing");
        return;
      }
  
      const response = await fetch(`http://localhost:3000/user-api/users/notes/undo-delete/${id}`, {
        method: "PUT",  // Use PUT to match the backend route
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log("Note restored successfully");
        // Remove the note from the trash state
        setTrash((prevTrash) => prevTrash.filter((item) => item.id !== id));
      } else {
        const errorText = await response.text();
        console.error(`Failed to restore note: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Error restoring note:", error);
    }
  };
  

  const handleDeletePermanently = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing");
        return;
      }
  
      const response = await fetch(`http://localhost:3000/user-api/users/notes/permanent-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

  
      if (response.ok) {
        // Assuming 'trash' is your state variable containing deleted notes
        const updatedTrashData = trash.filter((item) => item.id !== id);
        setTrash(updatedTrashData);
        console.log("Note deleted permanently");
      } else {
        console.error("Failed to delete note permanently:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting note permanently:", error);
    }
  };
  

  const handleOptionClick = (id) => {
    setSelectedTrashItemId(selectedTrashItemId === id ? null : id);
  };


  const handleTagCategoryClick = (category) => {
    if (category === "Personal") {
      setShowPersonalTagNotes(true);
      setShowWorkTagNotes(false);
      setSelectedTag("Personal");
    } else if (category === "Work") {
      setShowPersonalTagNotes(false);
      setShowWorkTagNotes(true);
      setSelectedTag("Work");
    }
  };
  return (
    <div className="w-full">
      <div>
      <div className="relative flex items-center mt-6">
  <div className="w-16 h-16 overflow-hidden">
    <img
      src={UserLogo}
      width="45px"
      alt="Profile"
      className="rounded-full bg-[#41b3a2] py-2 px-2.5"
    />
  </div>
  <div className="flex items-center ml-4">
    <span className="username text-3xl">{username}</span>
    <MdKeyboardArrowDown
      className="dropdown-icon text-2xl ml-2 cursor-pointer"
      onClick={toggleLogoutMenu}
    />
    {showLogoutMenu && (
      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
        {confirmLogout ? (
          <div className="p-4 text-center">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded"
                onClick={handleCancelLogout}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <button
            className="w-full py-2 px-4 text-left hover:bg-gray-200"
            onClick={handleConfirmLogout}
          >
            Log out
          </button>
        )}
      </div>
    )}
  </div>
  {showLogoutMenu && confirmLogout && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4 text-center">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded"
            onClick={handleCancelLogout}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  
        <SearchBar onSearch={(searchTerm) => console.log("Searching for:", searchTerm)} />
  
        <button
          onClick={handleNewNote}
          className="w-full mt-4 py-2 bg-[#41b3a2] text-white font-semibold rounded-md shadow-md hover:bg-[#33a89f] transition duration-300"
        >
          New Note
        </button>
  
        {isCreating && (
          <div className="mt-2 flex">
            <input
              type="text"
              value={noteNameInput}
              onChange={(e) => setNoteNameInput(e.target.value)}
              className="flex-grow border border-gray-300 rounded-md px-2 py-1"
              placeholder="Enter note title"
            />
            <button
              onClick={handleCreateNote}
              className="ml-2 bg-green-500 text-white px-4 py-1 rounded-md"
            >
              Create
            </button>
          </div>
        )}
  
        <div className="flex flex-col p-0 mt-4 ms-7">
          <Link to="/profile/home" className="flex text-xl font-semibold text-[#9e9e9e]">
            <img src={homeicon} className="w-5 me-2" alt="Home Icon" /> Home
          </Link>
  
          <button
            onClick={toggleFavoritesDropdown}
            className="flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]"
          >
            <img src={favouritesicon} className="w-4 me-2 pt-2" alt="Favourites Icon" /> Favourites
          </button>
  
          {showFavoritesDropdown && (
            <ul className="pl-4 text-md font-semibold text-[#9e9e9e]">
              {favoriteNotes.length > 0 ? (
                favoriteNotes.map((note) => (
                  <li key={note.noteId} className="flex items-center">
                    <Link to={`/profile/favourites/${note.noteId}`} className="flex-grow">
                      {note.title || "Untitled Note"}
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
            <img src={notesicon} className="w-4 me-2 pt-2" alt="Notes Icon" />
            Notes
          </button>
          {showNotesDropdown && (
            <ul className="pl-4 text-md font-semibold text-[#9e9e9e]">
              {notes.map((note) => (
                <li key={note.noteId} className="flex items-center justify-between">
                  {isEditing === note.noteId ? (
                    <>
                      <input
                        type="text"
                        value={noteNameInput}
                        onChange={(e) => setNoteNameInput(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 w-3/4"
                      />
                      <button
                        onClick={() => handleRenameNote(note.noteId)}
                        className="bg-green-500 text-white rounded-md px-2 py-1 ml-2"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to={`/profile/notes/${note.noteId}`}>
                        {note.title || "Untitled Note"}
                      </Link>
                      <button
                        onClick={() => {
                          setIsEditing(note.noteId);
                          setNoteNameInput(note.title);
                        }}
                        className="bg-yellow-500 text-white rounded-md px-2 py-0.5 my-1 ml-2"
                      >
                        Rename
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
   <button
          onClick={toggleTagsDropdown}
          className="flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]"
        >
          <img src={tagicon} className="w-4 me-2 pt-2" alt="Tags Icon" /> Tags
        </button>
        {showTagsDropdown && (
          <div className="pl-4 text-md font-semibold text-[#9e9e9e]">
            <button
              onClick={() => handleTagCategoryClick("Personal")}
              className="flex items-center mt-2"
            >
              Personal
            </button>
            <button
              onClick={() => handleTagCategoryClick("Work")}
              className="flex items-center mt-2"
            >
              Work
            </button>

            {showPersonalTagNotes && (
              <ul className="pl-4 mt-2">
                {filteredNotes.filter(note => note.tags.includes("Personal")).map((note) => (
                  <li key={note.noteId} className="flex items-center mt-1">
                    <Link to={`/profile/notes/${note.noteId}`} className="flex-grow text-left">
                      {note.title || "Untitled Note"}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {showWorkTagNotes && (
              <ul className="pl-4 mt-2">
                {filteredNotes.filter(note => note.tags.includes("Work")).map((note) => (
                  <li key={note.noteId} className="flex items-center mt-1">
                    <Link to={`/profile/notes/${note.noteId}`} className="flex-grow text-left">
                      {note.title || "Untitled Note"}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
  
          <button
            onClick={toggleTrashDropdown}
            className="flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]"
          >
            <img src={trashicon} className="w-4 me-2 pt-2" alt="Trash Icon" /> Trash
          </button>
  
          {showTrashDropdown && (
            <ul className="pl-4 text-md font-semibold text-[#9e9e9e]">
              {trash.map((note) => (
                <li key={note.noteId} className="flex items-center justify-between">
                  <span>{note.title || "Untitled Note"}</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRestoreNote(note.noteId)}
                      className="bg-blue-500 text-white rounded-md px-2 py-0.5 my-1 ml-2"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handleDeletePermanently(note.noteId)}
                      className="bg-red-500 text-white rounded-md px-2 py-0.5 my-1 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}  

export default Sidebar;
