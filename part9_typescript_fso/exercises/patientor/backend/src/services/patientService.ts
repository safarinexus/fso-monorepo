import data from "../data/patients-full";
import { PublicPatient, NewPatient, Patient, EntryWithoutId, Entry, Diagnosis } from "../types";  
import { v1 as uuid } from 'uuid'; 

const getPublicPatients = (): PublicPatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation,
        entries,
    }));
};

const getPatientById = (id:string) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i];
        }
    }
    return "not found";
};

const addPatient = ( patient: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
        id: id, 
        ...patient,
        entries: []
    };
    data.push(newPatient); 
    return newPatient;
};

const addEntrytoPatient = ( entry: EntryWithoutId, diagnosisCodes:Array<Diagnosis['code']>,  patientId: string ): Entry|string => {
    const patient = getPatientById(patientId); 
    if (patient !== "not found") { 
        const id = uuid(); 
        const newEntry = {
            id: id, 
            ...entry, 
            diagnosisCodes: diagnosisCodes,
        }; 
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === patientId) {
                data[i].entries.push(newEntry);
            }
        }

        return newEntry;
    } 

    return patient;
};

export default {
    getPublicPatients,
    addPatient, 
    getPatientById,
    addEntrytoPatient,
}; 