import { useDispatch } from "react-redux";
import { addNote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer' 

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNote = (e) => {
        e.preventDefault()
        const content = e.target.note.value
        dispatch(addNote(content))
        dispatch(setNotification(`'${content}' created!`))
    }

    return (
      <>
      <h2>create new</h2>
      <form onSubmit={createNote}>
        <div><input name="note"/></div>
        <button>create</button>
      </form>
      </>
    )
}

export default AnecdoteForm