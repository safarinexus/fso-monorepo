import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = async () => {
    try {
        return await axios
            .get<DiaryEntry[]>(baseUrl)
            .then(response => response.data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status);
            console.error(error.response);
            return error.message;
        } else {
            console.error(error);   
            return "Other Error";
        }
    }
}; 

export const createEntry = async ( object: NewDiaryEntry ) => {
    try {
        return await axios 
            .post<DiaryEntry>(baseUrl, object)
            .then(response => response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status);
            console.error(error.response);
            if (error.response) {
                return error.response.data;
            } 
            return "Some Error";
        } else {
            console.error(error);   
            return "Other Error"
        }
    }
};