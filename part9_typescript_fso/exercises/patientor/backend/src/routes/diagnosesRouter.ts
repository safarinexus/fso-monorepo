import { Router, Response } from "express";
import diagnosesService from "../services/diagnosesService"; 
import { Diagnosis } from "../types";
const diagnoses = Router(); 

diagnoses.get("/", (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosesService.getDiagnoses());
});

export default diagnoses;