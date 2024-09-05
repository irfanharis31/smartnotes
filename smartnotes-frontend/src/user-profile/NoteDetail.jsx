import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NoteDetail() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [tags, setTags] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isNewNote, setIsNewNote] = useState(!noteId);

  useEffect(() => {
    if (noteId) {
      console.log('noteId: ', noteId);
      const fetchNote = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user-api/users/notes/${noteId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const data = await response.json();
          console.log('Fetched note data:', data);

          if (data.noteId === noteId) {
            setNote(data);
            setNoteTitle(data.title || '');
            setNoteText(data.content || '');
            setTags(data.tags || []);
            setIsFavourite(data.isFavorite || false);
            setIsLocked(data.isLocked || false);
          } else {
            console.error('Note ID mismatch');
          }
        } catch (error) {
          console.error('Error fetching note:', error);
        }
      };

      fetchNote();
    }
  }, [noteId]);

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleAddTag = () => {
    const newTag = prompt('Enter a new tag:');
    if (newTag) {
      setTags([...tags, newTag]);
    }
  };

  const handleToggleFavourite = async () => {
    try {
      await fetch(`http://localhost:3000/user-api/users/notes/favorite/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleDeleteNote = async () => {
    const confirmDelete = window.confirm('Are you sure you want to move this note to trash?');
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/user-api/users/notes/delete/${noteId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        alert('Note moved to trash.');
        navigate('/notes');
      } catch (error) {
        console.error('Error moving note to trash:', error);
      }
    }
  };

  const handleSaveNote = async () => {
    try {
      const url = isNewNote
        ? 'http://localhost:3000/user-api/users/notes'
        : `http://localhost:3000/user-api/users/notes/${noteId}`;

      const method = isNewNote ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: noteTitle,
          content: noteText,
          tags,
          isFavorite: isFavourite,
          isLocked,
        }),
      });

      if (isNewNote) {
        const createdNote = await response.json();
        setIsNewNote(false);
        navigate(`/notes/${createdNote.noteId}`); // Redirect to the newly created note
      } else {
        alert('Note updated successfully!');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={noteTitle}
        onChange={handleTitleChange}
        placeholder="Enter note title"
        className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-[#41b3a2]"
      />
      <div className="flex gap-2 mb-2">
        <button
          onClick={handleAddTag}
          className="px-3 py-1 bg-[#41b3a2] text-white font-semibold rounded hover:bg-[#33a89f] transition duration-300"
        >
          Add Tag
        </button>
        <button
          onClick={handleToggleFavourite}
          className={`px-3 py-1 ${isFavourite ? 'bg-yellow-400' : 'bg-[#41b3a2]'} text-white font-semibold rounded hover:bg-[#33a89f] transition duration-300`}
        >
          {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
        </button>
        <button
          onClick={handleToggleLock}
          className={`px-3 py-1 ${isLocked ? 'bg-red-500' : 'bg-[#41b3a2]'} text-white font-semibold rounded hover:bg-[#33a89f] transition duration-300`}
        >
          {isLocked ? 'Unlock Note' : 'Lock Note'}
        </button>
        {!isNewNote && (
          <button
            onClick={handleDeleteNote}
            className="px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition duration-300"
          >
            Delete Note
          </button>
        )}
      </div>
      <textarea
        value={noteText}
        onChange={handleTextChange}
        onBlur={handleSaveNote}
        className="w-full h-96 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#41b3a2] focus:border-transparent"
        placeholder="Enter your note content here..."
        disabled={isLocked}
      />
      <div>
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 text-sm bg-gray-200 rounded-full mr-2">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default NoteDetail;
