import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import Note from './components/Note'
import NoteForm from './components/NoteForm'


function App() {

  const [ newNote, setNewNote ] = useState(''); // used for creating a new todo
  const [ notes, setNote ] = useState([]); //should contain all todos
  const [ textData, setTextData ] = useState(''); // used for editing a todo

// get a reference to my collection:
    const notesCollectionRef = collection(db, 'notes')
// CREATE a new todo to my collection:
    const createNote = async () => {
      await addDoc( notesCollectionRef, { text: newNote } )
    }
// READ /grab data from DB, runs after dom is loaded, or a change in collection
    useEffect( (e) => {
      const getNotes = async () => {
        const response = await getDocs( notesCollectionRef );
        const data = response.docs.map( (doc) => ({...doc.data(), id: doc.id }));
        setNote(data);
      }
      getNotes();
    }, [notesCollectionRef])
// UPDATE data in my database :
    const updateNote = async ( id, note ) => {
      const noteDoc = doc( db, 'notes', id );
      const newText = textData;
      await updateDoc( noteDoc, newNote);
    }
// DELETE data from my database :
    const deleteNote = async ( id ) => {
      const noteDoc = doc(db, 'notes', id);
      await deleteDoc( noteDoc);
    }
// custom functions :

    function clickHandler (e){
       e.preventDefault();
        setNewNote('');
        createNote();
       }

return (
    <div className="App">
      <main className="notesList">
        <NoteForm newNote={newNote} onClick={ clickHandler  } onChange={ (e) => setNewNote(e.target.value) } />
         { notes.map( note => <Note delete={(e) =>  deleteNote(note.id)} key={note.id} text={note.text} />) }
      </main>
    </div>
)
}

export default App;