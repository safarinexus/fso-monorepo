import { useState, useEffect } from 'react';
import { Note } from "./types"; 
import { getAllNotes, createNote } from './noteService';

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", content: 'testing' }
  ]);

  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNote({ content: newNote }).then(data => {
      setNotes(notes.concat(data));
    });
    setNewNote('');
  };

  useEffect(() => {
    getAllNotes().then(data => {
      setNotes(data);
    });
  }, []); 

  return (
    <div>
      <form onSubmit={noteCreation}> 
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
      </form>
      <ul>
        {notes.map((note) => 
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  )
};

export default App
