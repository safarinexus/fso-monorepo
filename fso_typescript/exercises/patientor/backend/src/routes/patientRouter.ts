import { Router, Response, Request, NextFunction } from "express";
import patientService from "../services/patientService"; 
import { PublicPatient, NewPatient, Patient } from "../types";
import { NewPatientSchema } from "../utils";
import { z } from "zod"; 
const patients = Router(); 

patients.get("/", (_req, res: Response<PublicPatient[]>) => {
    res.send(patientService.getPublicPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try { 
        NewPatientSchema.parse(req.body); 
        next();
    } catch (error: unknown) { 
        next(error); 
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) { 
        res.status(400).send({ error: error.issues }); 
    } else { 
        next(error); 
    }
};

patients.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient); 
});

patients.use(errorMiddleware);

export default patients;