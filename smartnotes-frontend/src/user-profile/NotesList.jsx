import React, { useState, useEffect } from 'react';

const NoteList = ({ username }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Fetch notes from backend on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/user-api/users/me`);
        const data = await response.json();
        setNotes(data.notes || []); // Set the notes in state
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [username]);

  // Handle adding a new note
  const addNote = async () => {
    if (newNote.trim() === '') return;

    const noteData = {
      title: newNote, // Assuming you're using the title field for the note
      username: username,
    };

    try {
      const response = await fetch('/user-api/users/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      const data = await response.json();
      setNotes([...notes, data.note]); // Add the newly created note to the state
      setNewNote(''); // Clear input field
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={note.noteId}>{note.title}</li> // Displaying the note title
        ))}
      </ul>
      <div className="add-note">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="New note title"
        />
        <button onClick={addNote}>Add Note</button>
      </div>
    </div>
  );
};

export default NoteList;
