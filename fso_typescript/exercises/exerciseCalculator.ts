//Exercise 9.2 
//Exercise calculator 
export type rating = 1 | 2 | 3;
export type ratingDescription = 'terrible' | 'alright' | 'coolioes';

export interface exerciseTarget  {
    periodLength: number; 
    trainingDays: number; 
    success: boolean;
    rating: rating; 
    ratingDescription: ratingDescription;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: string[]) => {
    const dailyExercise = []; 
    let target = null;
    for (let i  = 2; i < args.length - 1; i++) { 
        if (isNaN(Number(args[i]))) {
            throw new Error("Please key in only numbers!");
        } else {
            dailyExercise.push(Number(args[i]));
        }
    }
    if (!isNaN(Number(args[args.length - 1]))) {
        target = Number(args[args.length -1]); 
    } else {
        throw new Error("Please key in a target that is a number!");
    }

    return {
        dailyExercise: dailyExercise,
        target: target,
    };
};

export const calculateExercises = (dailyExercise: number[], target: number): exerciseTarget => {
    let success: boolean = true;
    let ratingDescription: ratingDescription = 'terrible';
    let rating: rating = 1;
    const periodLength: number = dailyExercise.length;
    const totalHours = dailyExercise.reduce((total: number, curr: number):number => {
        return total += curr;
    }, 0);
    const average: number = totalHours/periodLength;
    const trainingDays = dailyExercise.reduce((total: number, curr: number):number => {
        if (curr !== 0) {
            return total += 1;
        } else {
            return total;
        }
    }, 0);
    const moreThanTargetDays = dailyExercise.reduce((total: number, curr: number): number => {
        if (curr >= target) {
            return total += 1;
        } else {
            success = false;
            return total;
        }
    }, 0);
    if (moreThanTargetDays >= (0.75*periodLength)) { 
        rating = 3; 
        ratingDescription = "coolioes"; 
    } else if (moreThanTargetDays < (0.75*periodLength) && moreThanTargetDays >= (0.5*periodLength)) { 
        rating = 2;
        ratingDescription = "alright";
    }

    return {
        periodLength,
        trainingDays, 
        success,
        rating, 
        ratingDescription,
        target, 
        average
    };
};

if (require.main === module) { 
    try {
        const { dailyExercise, target } = parseExerciseArguments(process.argv);
        console.log(calculateExercises(dailyExercise, target)); 
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) { 
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
