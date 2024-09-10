import React, { useState, useRef, useEffect } from 'react';

function NoteDetail() {
  const [noteText, setNoteText] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const editorRef = useRef(null);

  const handleToggleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  const handleRemoveTag = () => {
    // Add your remove tag logic here
  };

  const handleDeleteNote = () => {
    // Add your delete note logic here
  };

  const handleToggleLock = () => {
    if (isLocked) {
      setShowPasswordModal(true);
    } else {
      setIsLocked(true);
    }
  };

  const handlePasswordSubmit = () => {
    // Simulate password verification
    const correctPassword = 'password123'; // Replace with your actual password verification logic
    if (enteredPassword === correctPassword) {
      setIsLocked(false);
      setShowPasswordModal(false);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const applyFormatting = (command, value = null) => {
    if (document.queryCommandSupported(command)) {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        setNoteText(editorRef.current.innerHTML);
      }
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = noteText;
    }
  }, [noteText]);

  const handleInput = () => {
    if (editorRef.current) {
      setNoteText(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {isFavourite ? (
          <button
            onClick={handleToggleFavourite}
            className="px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-300"
          >
            Remove from Favourites
          </button>
        ) : (
          <button
            onClick={handleToggleFavourite}
            className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
          >
            Add to Favourites
          </button>
        )}
        <button
          onClick={handleRemoveTag}
          className="px-3 py-1 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition duration-300"
        >
          Remove Tag
        </button>
        <button
          onClick={handleDeleteNote}
          className="px-3 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-300"
        >
          Delete Note
        </button>
        <button
          onClick={handleToggleLock}
          className="px-3 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
        >
          {isLocked ? 'Unlock Note' : 'Lock Note'}
        </button>
      </div>
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => applyFormatting('bold')}
          className="px-2 py-1 border rounded-md font-semibold text-gray-700 hover:bg-gray-200"
        >
          Bold
        </button>
        <button
          onClick={() => applyFormatting('italic')}
          className="px-2 py-1 border rounded-md font-semibold text-gray-700 hover:bg-gray-200"
        >
          Italic
        </button>
        <button
          onClick={() => applyFormatting('backColor', 'yellow')}
          className="px-2 py-1 border rounded-md font-semibold text-gray-700 hover:bg-gray-200"
        >
          Highlight
        </button>
      </div>
      <div
        id="note-editor"
        contentEditable={!isLocked}
        onInput={handleInput}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-[#41b3a2] min-h-[200px] text-left"
      >
        {noteText}
      </div>
      
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4">Unlock Note</h3>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-[#41b3a2]"
            />
            {passwordError && <p className="text-red-600">{passwordError}</p>}
            <div className="flex justify-end">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 mr-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteDetail;
