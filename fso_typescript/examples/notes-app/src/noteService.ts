import axios from "axios"; 
import { Note, NewNote } from "./types"; 

const baseUrl = "http:localhost:3001/notes"; 

export const getAllNotes = async () => {
    return axios
        .get<Note[]>(baseUrl)
        .then(response => response.data);
};

export const createNote = async (object: NewNote) => {
    return axios 
        .post<Note>(baseUrl, object)
        .then(response => response.data);
};