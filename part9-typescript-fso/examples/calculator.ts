export type Operation = 'multiply' | 'add' | 'divide';

export const calculator = (a: number, b: number, op: Operation): number => {
    switch(op) { 
        case 'multiply':
            return a * b;  
        case 'divide':
            if (b === 0) throw new Error('Can\'t divide by 0!'); 
            return a / b;
        case 'add':
            return a + b;
        default: 
            throw new Error('Operation is not of multiply, add or divide! Please enter a valid operation.');
    }
};

if (require.main === module) {
    try { 
        console.log(calculator(1, 5, 'divide'));
    } catch (error: unknown) { 
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}

