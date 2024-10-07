import data from "../data/patients";
import { PublicPatient, NewPatient, Patient } from "../types";  
import { v1 as uuid } from 'uuid'; 

const getPublicPatients = (): PublicPatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation,
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
        id: id, 
        ...patient
    };
    data.push(newPatient); 
    return newPatient;
};

export default {
    getPublicPatients,
    addPatient, 
}; 