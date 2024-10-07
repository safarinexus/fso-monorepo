import { z } from 'zod'; 
import { NewPatientSchema } from './utils';

export type Diagnosis = {
    code: string; 
    name: string; 
    latin?: string;
};

export enum Gender { 
    Male = 'male', 
    Female = 'female', 
    Other = 'other'
} 

export interface Patient {
    id: string; 
    name: string; 
    dateOfBirth: string;
    gender: Gender;
    occupation: string; 
    ssn: string; 
};

export type PublicPatient = Omit<Patient, "ssn">;

export type NewPatient = z.infer<typeof NewPatientSchema>; 