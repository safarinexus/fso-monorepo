import express, { Request, Response, NextFunction } from 'express'; 
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry } from '../types';
import { newEntrySchema } from '../utils'; 
import { z } from "zod";

const router = express.Router(); 

router.get("/", (_req, res: Response<DiaryEntry[]>) => {
    res.send(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id)); 

    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
    try { 
        newEntrySchema.parse(req.body); 
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

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
        const addedEntry = diaryService.addDiary(req.body);
        res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;