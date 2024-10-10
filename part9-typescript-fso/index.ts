import express from 'express';
import calculateBmi from "./exercises/bmiCalculator";
import { calculator, Operation } from './examples/calculator';
import { calculateExercises } from "./exercises/exerciseCalculator";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/bmi", (req, res) => {
    const queries = req.query;
    if (!isNaN(Number(queries.height)) && !isNaN(Number(queries.weight))) {
        const result = calculateBmi(Number(queries.height), Number(queries.weight));
        res.status(200).json({
            weight: queries.weight, 
            height: queries.height,
            bmi: result
        });
    } else {
        res.status(404).json({
            status: 404,
            error: "malformatted parameters"
        }); 
    }
});

app.post("/calculate", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    if ( !value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2)) || !op || (op !== "multiply" && op !== "add" && op !== "divide") ) {
        res.status(404).json({
            status: 404, 
            error: "malformatted parameters"
        });
    } else {
        const result = calculator(Number(value1), Number(value2), op as Operation);
        res.status(200).json({
            status: 200, 
            result: result
        });
    }
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const daily_exercises: [] = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target; 

    if (!daily_exercises || !target) {
        res.status(404).json({
            status: 404, 
            error: "parameters missing"
        });
        return;
    }


    if ( isNaN(Number(target)) || !Array.isArray(daily_exercises)) { 
        res.status(404).json({
            status: 404, 
            error: "malformatted parameters"
        });
        return;
    }

    const copy: number[] = [];
    for (let i = 0; i < daily_exercises.length; i++) {
        if (isNaN(Number(daily_exercises[i]))) {
            res.status(404).json({
                status: 404, 
                error: "malformatted parameters 2"
            });
            return;
        } else {
            copy.push(Number(daily_exercises[i]));
        }
    }

    const result = calculateExercises(daily_exercises, Number(target));
    res.status(200).json({
        periodLength: result.periodLength, 
        trainingDays: result.trainingDays,
        success: result.success,
        rating: result.rating,
        ratingDescription: result.ratingDescription,
        target: result.target,
        average: result.average,
    });
    return;
});


app.listen(port, () => console.log(`App started! Listening on port ${port}`)); 
