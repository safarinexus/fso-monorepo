//Exercise 9.1
//BMI is calculated as body mass (kg) divided by the square of body height (m) resulting in BMI (kg/m^2)
//Write a function calculateBmi that calculates BMI based on a given height (cm) and weight (kg) and then returns a message 
//normal range is 18.5 to 24.9

interface inputValues {
    height: number; 
    weight: number; 
}

const parseBmiArguments = (args: string[]): inputValues => { 
    if (args.length != 4) throw new Error('Please key in the exact amount of required arguments (2)');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]), 
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
} ;

const calculateBmi = (height: number, weight: number): string => {
    const formulaHeight: number = (height/100) * (height/100);
    const bmi: number = weight/formulaHeight; 
    if (bmi > 18.4 && bmi < 25) { 
        return "Normal range";
    } else if (bmi >= 25) { 
        return "overweight"; 
    }  
    return "underweight";
};

if (require.main === module) { 
    try {
        const { height, weight } = parseBmiArguments(process.argv);
        console.log(calculateBmi(height, weight)); 
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) { 
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}

export default calculateBmi;

