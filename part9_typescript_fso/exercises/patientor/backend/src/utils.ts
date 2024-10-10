import { NewPatient, Gender, EntryWithoutId, HealthCheckRating } from "./types"; 
import { z } from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(), 
    dateOfBirth: z.string().date(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(), 
    ssn: z.string(),
}); 

export const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object); 
};

const DischargeSchema = z.object({
    date: z.string(), // You can refine with regex for a valid date
    criteria: z.string(),
});

const SickLeaveSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
});

const HealthCheckRatingSchema = z.nativeEnum(HealthCheckRating);

const BaseNewEntrySchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(), // Array of Diagnosis codes (strings)
});

const HealthCheckEntrySchema = BaseNewEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: HealthCheckRatingSchema,
});
  
  const HospitalEntrySchema = BaseNewEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: DischargeSchema,
});
  
  const OccupationalHealthcareEntrySchema = BaseNewEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional(),
});

const NewEntrySchema = z.union([
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
]);
  

export const toNewEntry = (object: unknown): EntryWithoutId => {
    return NewEntrySchema.parse(object);
};

/*

export const NewEntrySchema = z.object({
    description: z.string(), 
    date: z.string(), 
    specialist: z.string(), 
    diagnosisCodes: z.string().array().optional(),
});

*/