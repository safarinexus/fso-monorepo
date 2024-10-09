import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry }  from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import Entries from "./components/Entries";
import Add from "./components/Add";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>("");
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "", 
    weather: "sunny",
    visibility: "great",
    comment: "",
  });

  useEffect(() => {
    getAllEntries().then(data => {
      if (typeof data === "string") {
        console.log(data);
      } else {
        setDiaries(data);
      }
    })
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createEntry(newDiary).then(data => {
      if (typeof data === "string") {
        setError(data);
      } else {
        setDiaries(diaries.concat(data));
        setNewDiary({
          date: "", 
          weather: "",
          visibility: "",
          comment: "",
        })
        setError('');
      }
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDiary({
      ...newDiary,
      [name]: value
    });
  };


  return (
    <>
      <Add newDiary={newDiary} handleSubmit={handleSubmit} handleChange={handleChange} />
      {error !== "" ? (<p style={{color:"red"}}>{error}</p>) : ("") }
      <h1>Diary Entries</h1> 
      <Entries entries={diaries} />
    </>
  )
}

export default App
