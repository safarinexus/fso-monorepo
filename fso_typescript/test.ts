const array = [1, 2, 3, 0];

const trainingDays = array.reduce((total: number, curr: number):number => {
    if (curr !== 0) {
        return total += 1;
    } else {
        return total;
    }
}, 0);

console.log(trainingDays);