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
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log("Note restored successfully");
        setTrash(prevTrash => prevTrash.filter(item => item.id !== id));
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
        setTrash(prevTrash => prevTrash.filter(item => item.id !== id));
        console.log("Note deleted permanently");
      } else {
        console.error("Failed to delete note permanently:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting note permanently:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={UserLogo} alt="User Logo" className="user-logo" />
        <div className="username-dropdown">
          <span className="username">{username}</span>
          <MdKeyboardArrowDown className="dropdown-icon" onClick={toggleLogoutMenu} />
          {showLogoutMenu && (
            <div className="logout-menu">
              {confirmLogout ? (
                <div className="confirm-logout">
                  <p>Are you sure you want to log out?</p>
                  <button onClick={handleLogout}>Yes</button>
                  <button onClick={handleCancelLogout}>No</button>
                </div>
              ) : (
                <button onClick={handleConfirmLogout}>Log out</button>
              )}
            </div>
          )}
        </div>
      </div>
      <SearchBar />
      <div className="sidebar-links">
        <Link to="/home" className="sidebar-link">
          <img src={homeicon} alt="Home" />
          Home
        </Link>
        <div className="sidebar-link" onClick={toggleNotesDropdown}>
          <img src={notesicon} alt="Notes" />
          Notes
          <FaEllipsisV className="dropdown-icon" />
        </div>
        {showNotesDropdown && (
          <div className="notes-dropdown">
            {notes.map(note => (
              <div key={note.noteId} className="note-item">
                {isEditing === note.noteId ? (
                  <div>
                    <input
                      type="text"
                      value={noteNameInput}
                      onChange={(e) => setNoteNameInput(e.target.value)}
                      onBlur={() => handleRenameNote(note.noteId)}
                    />
                  </div>
                ) : (
                  <span onClick={() => setIsEditing(note.noteId)}>{note.title}</span>
                )}
              </div>
            ))}
            <button onClick={handleNewNote}>Create New Note</button>
            {isCreating && (
              <div className="create-note-form">
                <input
                  type="text"
                  value={noteNameInput}
                  onChange={(e) => setNoteNameInput(e.target.value)}
                />
                <button onClick={handleCreateNote}>Save</button>
              </div>
            )}
          </div>
        )}
        <div className="sidebar-link" onClick={toggleFavoritesDropdown}>
          <img src={favouritesicon} alt="Favorites" />
          Favorites
          <FaEllipsisV className="dropdown-icon" />
        </div>
        {showFavoritesDropdown && (
          <div className="favorites-dropdown">
            {favoriteNotes.map(note => (
              <div key={note.noteId} className="note-item">{note.title}</div>
            ))}
          </div>
        )}
        <div className="sidebar-link" onClick={toggleTagsDropdown}>
          <img src={tagicon} alt="Tags" />
          Tags
          <FaEllipsisV className="dropdown-icon" />
        </div>
        {showTagsDropdown && (
          <div className="tags-dropdown">
            <div className="tags-category" onClick={toggleTagCategoriesDropdown}>
              <span>Categories</span>
              <FaEllipsisV className="dropdown-icon" />
            </div>
            {showTagCategoriesDropdown && (
              <div className="tag-categories">
                <div className="tag-category" onClick={() => setSelectedTag("Personal")}>
                  Personal
                </div>
                <div className="tag-category" onClick={() => setSelectedTag("Work")}>
                  Work
                </div>
              </div>
            )}
          </div>
        )}
        <div className="sidebar-link" onClick={toggleTrashDropdown}>
          <img src={trashicon} alt="Trash" />
          Trash
          <FaEllipsisV className="dropdown-icon" />
        </div>
        {showTrashDropdown && (
          <div className="trash-dropdown">
            {trash.map(item => (
              <div key={item.id} className="trash-item">
                {item.title}
                <button onClick={() => handleRestoreNote(item.id)}>Restore</button>
                <button onClick={() => handleDeletePermanently(item.id)}>Delete Permanently</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
