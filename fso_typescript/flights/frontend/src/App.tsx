import { useState, useEffect } from "react";
import { DiaryEntry }  from "./types";
import { getAllEntries } from "./diaryService";
import Entries from "./components/Entries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaries(data);
    })
  }, []);

  return (
    <>
      <h1>Diary Entries</h1> 
      <Entries entries={diaries} />
    </>
  )
}

export default App
