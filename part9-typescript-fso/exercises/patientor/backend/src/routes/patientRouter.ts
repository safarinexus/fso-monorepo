import { Router, Response, Request, NextFunction } from "express";
import patientService from "../services/patientService"; 
import { PublicPatient, NewPatient, Patient, EntryWithoutId, Entry, Diagnosis } from "../types";
import { toNewPatient, toNewEntry } from "../utils";
import { z } from "zod"; 
const patients = Router(); 

patients.get("/", (_req, res: Response<PublicPatient[]>) => {
    res.send(patientService.getPublicPatients());
});

patients.get("/:id", (req, res: Response) => {
    const patientId = req.params.id; 
    res.send(patientService.getPatientById(patientId));
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try { 
        toNewPatient(req.body); 
        next();
    } catch (error: unknown) { 
        next(error); 
    }
};

patients.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient); 
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try { 
        toNewEntry(req.body); 
        next();
    } catch (error: unknown) { 
        next(error); 
    }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

patients.post("/:id/entries", newEntryParser, (req: Request, res: Response<Entry|string>) => {
    const patientId = req.params.id;
    const newEntry =  req.body as EntryWithoutId;
    const diagnosisCodes = parseDiagnosisCodes(newEntry);
    const addedEntry = patientService.addEntrytoPatient(newEntry, diagnosisCodes, patientId); 
    if(addedEntry === "not found") { 
        throw new Error("No such patient");
    } 

    res.json(addedEntry);
});  


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) { 
        res.status(400).send({ error: error.issues }); 
    } else {    
        next(error); 
    }
};

patients.use(errorMiddleware);

export default patients;