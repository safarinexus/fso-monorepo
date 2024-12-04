import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const sortedNotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdote
        } else {
            return state.anecdote.filter((anecdote) => {
                if (anecdote.content.includes(state.filter)) {
                    return anecdote
                }
            })
        }
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
        for (let i = 0; i < sortedNotes.length; i++) {
            if (sortedNotes[i].id === id) {
                dispatch(setNotification(`you voted for '${sortedNotes[i].content}'`))
                break;
            }
        }
    }

    return ( 
        <>
            {sortedNotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList