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