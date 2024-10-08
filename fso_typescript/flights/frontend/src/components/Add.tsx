import { NewDiaryEntry } from "../types";

const Add = ({ newDiary, handleSubmit, handleChange }: { newDiary: NewDiaryEntry, handleSubmit: (e: React.SyntheticEvent) => void, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <>
            <h1>Add a New Entry</h1>
            <form onSubmit={handleSubmit}> 
                <label htmlFor="date">Date</label>
                <input 
                    type="text" 
                    name="date"
                    value={newDiary.date}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="visibility">Visibility</label>
                <input 
                    type="text"
                    name="visibility"
                    value={newDiary.visibility}
                    onChange={handleChange} 
                /><br/>
                <label htmlFor="weather">Weather</label>
                <input 
                    type="text"
                    name="weather"
                    value={newDiary.weather}
                    onChange={handleChange} 
                /><br/>
                <label htmlFor="comment">Comment</label>
                <input 
                    type="text"
                    name="comment"
                    value={newDiary.comment}
                    onChange={handleChange} 
                /><br/>
                <button type="submit">add</button>
            </form>  
        </>
    )
}; 

export default Add;
