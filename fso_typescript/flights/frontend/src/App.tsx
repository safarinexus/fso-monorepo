import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry }  from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import Entries from "./components/Entries";
import Add from "./components/Add";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "", 
    weather: "",
    visibility: "",
    comment: "",
  });

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaries(data);
    })
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createEntry(newDiary).then(data => {
      console.log(data);
      setDiaries(diaries.concat(data));
    })
    setNewDiary({
      date: "", 
      weather: "",
      visibility: "",
      comment: "",
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
      <Add newDiary={newDiary} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <h1>Diary Entries</h1> 
      <Entries entries={diaries} />
    </>
  )
}

export default App
