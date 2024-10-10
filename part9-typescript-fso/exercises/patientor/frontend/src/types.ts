export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string; 
  description: string; 
  date: string; 
  specialist: string; 
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0, 
  "LowRisk" = 1, 
  "HighRisk" = 2, 
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"; 
  healthCheckRating: HealthCheckRating;
}

export interface Discharge { 
  date: string; 
  criteria: string; 
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge; 
}

export interface SickLeave { 
  startDate: string; 
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"; 
  employerName: string; 
  sickLeave?: SickLeave;
}

export type Entry = 
  HospitalEntry | 
  OccupationalHealthcareEntry | 
  HealthCheckEntry;

export const isEntry = (object: unknown): object is Entry => {
    if (!object || typeof object !== "object") {
      throw new Error("is not an entry."); 
    }

    if ("description" in object && "date" in object && "specialist" in object) { 
      return true; 
    } else {
      throw new Error ("is not an entry");
    }
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
  
export type PatientFormValues = Omit<Patient, "id" | "entries">;