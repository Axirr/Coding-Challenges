import myAssert from "../march2023/Trie";

function average(salary: number[]): number {
    if (salary.length <= 2)  return 0;

    let maxSalary:number = Math.max(salary[0], salary[1]);
    let minSalary:number = Math.min(salary[0], salary[1]);
    let total:number = 0;

    for (let i = 2; i < salary.length; i++) {
        const currentSalary = salary[i];

        if (currentSalary > maxSalary) {
            total += maxSalary;
            maxSalary = currentSalary;
        } else if (currentSalary < minSalary) {
            total += minSalary;
            minSalary = currentSalary;
        } else {
            total += currentSalary;
        }
    }

    return total / (salary.length - 2);
};

function mainAverage():void {
    let salary:number[];
    let result:number;
    let epsilon:number = 0.0001;
    let doQuitIfAssertFails:boolean = true;

    salary = [4000,3000,1000,2000];
    result = average(salary);
    console.log(`Final result ${result}`);
    myAssert(Math.abs(result - 2500) < epsilon, doQuitIfAssertFails);

    salary = [1000,2000,3000];
    result = average(salary);
    console.log(`Final result ${result}`);
    myAssert(Math.abs(result - 2000) < epsilon, doQuitIfAssertFails);
}

mainAverage();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
*/

/*
Completion time (minutes): 12
Question difficulty: Easy
How did it go (0 - 6): 5
    Minor bugs
    And made a fast solution first try
        Simple but not the naive one
*/