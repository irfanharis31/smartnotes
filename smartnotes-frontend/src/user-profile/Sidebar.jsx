import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLogo from '../assets/userlogo.svg';
import homeicon from '../assets/home.svg';
import favouritesicon from '../assets/favourites.svg';
import tagicon from '../assets/tagicon.svg';
import notesicon from '../assets/notesicon.svg';
import trashicon from '../assets/trashicon.svg';
import SearchBar from './SearchBar';

function Sidebar() {
  const [showNotesDropdown, setShowNotesDropdown] = useState(false);
  const [notes, setNotes] = useState([{ id: 1, name: 'Note 1' }, { id: 2, name: 'Note 2' }]);
  const [isEditing, setIsEditing] = useState(null);
  const [newNoteName, setNewNoteName] = useState('');
  const [noteNameInput, setNoteNameInput] = useState('');

  const toggleNotesDropdown = () => {
    setShowNotesDropdown(!showNotesDropdown);
  };

  // Function to handle creating a new note
  const handleNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      name: 'New Note',
    };
    setNotes([...notes, newNote]);
    setIsEditing(newNote.id);
    setNoteNameInput('');
  };

  // Function to handle renaming a note
  const handleRenameNote = (id) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, name: noteNameInput || note.name } : note))
    );
    setIsEditing(null);
    setNoteNameInput('');
  };

  return (
    <div className='w-full'>
      <div className=''>
        <div className='flex items-center mt-6'>
          <div className='w-16 h-16 overflow-hidden'>
            <img
              src={UserLogo}
              width='45px'
              alt='Profile'
              className='rounded-full bg-[#41b3a2] py-2 px-2.5'
            />
          </div>
          <div className='pb-5'>
            <h1 className='text-[#000000] text-2xl font-semibold'>Fakruddin</h1>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar onSearch={(searchTerm) => console.log('Searching for:', searchTerm)} />

        {/* New Note Button */}
        <button
          onClick={handleNewNote}
          className='w-full mt-4 py-2 bg-[#41b3a2] text-white font-semibold rounded-md shadow-md hover:bg-[#33a89f] transition duration-300'
        >
          New Note
        </button>

        <div className='flex flex-col p-0 mt-4 ms-7'>
          <Link to='/profile/home' className='flex text-xl font-semibold text-[#9e9e9e]'>
            <img src={homeicon} className='w-5 me-2' alt='' /> Home
          </Link>
          <Link to='/profile/favourites' className='flex text-xl font-semibold mt-2 text-[#9e9e9e]'>
            <img src={favouritesicon} className='w-5 me-2' alt='' /> Favourites
          </Link>
          <button onClick={toggleNotesDropdown} className='flex text-xl w-full mt-2 font-semibold text-[#9e9e9e]'>
            <img src={notesicon} className='w-4 me-2 pt-2' alt='' /> Notes
          </button>
          {showNotesDropdown && (
            <ul className='pl-4 text-md font-semibold text-[#9e9e9e]'>
              {notes.map((note) => (
                <li key={note.id} className='flex items-center'>
                  {isEditing === note.id ? (
                    <>
                      <input
                        type='text'
                        value={noteNameInput}
                        onChange={(e) => setNoteNameInput(e.target.value)}
                        className='border border-gray-300 rounded-md px-2 py-1'
                        placeholder='Enter note name'
                      />
                      <button
                        onClick={() => handleRenameNote(note.id)}
                        className='ml-2 text-[#41b3a2] font-bold'
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to={`/profile/notes/${note.id}`} className='flex-grow'>
                        {note.name}
                      </Link>
                      <button
                        onClick={() => setIsEditing(note.id)}
                        className='ml-2 text-sm text-[#41b3a2] underline'
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <Link to='/profile/tags' className='flex text-xl mt-2 font-semibold text-[#9e9e9e]'>
            <img src={tagicon} className='w-4 me-2 pt-1.5' alt='' /> Tags
          </Link>
          <Link to='/profile/tags' className='flex text-xl mt-2 font-semibold text-[#9e9e9e]'>
            <img src={trashicon} className='w-4 me-2 pt-1' alt='' /> Trash
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
