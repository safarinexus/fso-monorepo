import { DiaryEntry } from '../types'; 

const Entries = ({ entries }: { entries: DiaryEntry[] }) => {
    return (
        <>
            {entries.map(entry => {
                    return (
                        <div>
                            <h3>{entry.date}</h3> 
                            <p>Weather: {entry.weather}</p>
                            <p>Visibility: {entry.visibility}</p>
                            <p>Comment: {entry.comment}</p>
                        </div>
                    )
                })
            }
        </>
    )
};

export default Entries;