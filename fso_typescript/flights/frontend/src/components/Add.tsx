import { NewDiaryEntry } from "../types";

const Add = ({ newDiary, handleSubmit, handleChange }: { newDiary: NewDiaryEntry, handleSubmit: (e: React.SyntheticEvent) => void, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {

    return (
        <>
            <h1>Add a New Entry</h1>
            <form onSubmit={handleSubmit}> 
                <label htmlFor="date">Date</label>
                <input 
                    type="date" 
                    name="date"
                    value={newDiary.date}
                    onChange={handleChange}
                /><br/>
                <label htmlFor="visibility">Visibility</label>
                <input 
                    type="radio"
                    name="visibility"
                    value="great"
                    checked={newDiary.visibility === "great"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Great</label>
                <input 
                    type="radio"
                    name="visibility"
                    value="good"
                    checked={newDiary.visibility === "good"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Good</label>
                <input 
                    type="radio"
                    name="visibility"
                    value={"ok"}
                    checked={newDiary.visibility === "ok"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Ok</label>
                <input 
                    type="radio"
                    name="visibility"
                    value={"poor"}
                    checked={newDiary.visibility === "poor"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Poor</label>
                <br />
                <label htmlFor="weather">Weather</label>
                <input 
                    type="radio"
                    name="weather"
                    value="sunny"
                    checked={newDiary.weather === "sunny"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Sunny</label>
                <input 
                    type="radio"
                    name="weather"
                    value="rainy"
                    checked={newDiary.weather === "rainy"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Rainy</label>
                <input 
                    type="radio"
                    name="weather"
                    value="cloudy"
                    checked={newDiary.weather === "cloudy"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Cloudy</label>
                <input 
                    type="radio"
                    name="weather"
                    value="stormy"
                    checked={newDiary.weather === "stormy"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Stormy</label>
                <input 
                    type="radio"
                    name="weather"
                    value="windy"
                    checked={newDiary.weather === "windy"}
                    onChange={handleChange} 
                />
                <label htmlFor="">Windy</label>
                <br />
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
