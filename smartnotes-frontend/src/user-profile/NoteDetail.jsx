import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function NoteDetail() {
  const { noteId } = useParams();
  const [notesContent, setNotesContent] = useState({});
  const [noteText, setNoteText] = useState('');
  const [tags, setTags] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Load note content from state when the component mounts or noteId changes
  useEffect(() => {
    if (notesContent[noteId]) {
      setNoteText(notesContent[noteId]);
    } else {
      setNoteText('');
    }
  }, [noteId, notesContent]);

  // Save note content when it changes
  const handleTextChange = (e) => {
    const updatedText = e.target.value;
    setNoteText(updatedText);
    setNotesContent((prevContent) => ({
      ...prevContent,
      [noteId]: updatedText,
    }));
  };

  // Function to add a tag to the note
  const handleAddTag = () => {
    const newTag = prompt('Enter a new tag:');
    if (newTag) {
      setTags([...tags, newTag]);
    }
  };

  // Toggle favourite status
  const handleToggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  // Lock or unlock the note
  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  // Delete note (move to trash)
  const handleDeleteNote = () => {
    const confirmDelete = window.confirm('Are you sure you want to move this note to trash?');
    if (confirmDelete) {
      // Here, you would update your state or backend to reflect the deletion
      alert('Note moved to trash.');
      // Clear the current note content
      setNotesContent((prevContent) => {
        const updatedContent = { ...prevContent };
        delete updatedContent[noteId];
        return updatedContent;
      });
      setNoteText('');
    }
  };

  return (
    <div className="p-4">
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
        <button
          onClick={handleDeleteNote}
          className="px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition duration-300"
        >
          Delete Note
        </button>
      </div>
      <textarea
        value={noteText}
        onChange={handleTextChange}
        className="w-full h-96 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#41b3a2] focus:border-transparent"
        placeholder="Enter your note content here..."
        disabled={isLocked}
      />
    </div>
  );
}

export default NoteDetail;
