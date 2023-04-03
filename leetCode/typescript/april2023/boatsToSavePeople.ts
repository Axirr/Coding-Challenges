import myAssert from "../march2023/Trie";

function numRescueBoats(people: number[], limit: number): number {
    people.sort((a, b) => a - b);
    let boatCount:number = 0;

    while (people.length > 1) {
        boatCount++;
        let heavyPerson:number = people[people.length - 1];
        let complement:number = limit - heavyPerson;

        let low:number = 0;
        let high:number = people.length - 2;
        let middle:number = Math.floor((low + high) / 2)
        let validIndex:number = -1;
        while (low <= high) {
            middle = Math.floor((low + high) / 2)
            if (people[middle] <= complement) {
                validIndex = middle;
                low = middle + 1;
            } else  high = middle - 1;
        }

        if (validIndex >= 0)  {
            // Inefficient
            people.splice(validIndex, 1);
        } 

        people.pop();
    }

    if (people.length > 0)  boatCount++;

    return boatCount;
};

function mainNumRescueBoats():void {
    let people:number[];
    let limit:number;
    let result:number;
    let doQuitOnFail:boolean = true;

    people = [1,2];
    limit = 3;
    result = numRescueBoats(people, limit);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitOnFail);

    people = [3,2,2,1];
    limit = 3;
    result = numRescueBoats(people, limit);
    console.log(`Final result ${result}`);
    myAssert(result === 3, doQuitOnFail);

    // have to put single people in boats because no pair is below limit
    // some person has weight = limit
    people = [3,5,3,4];
    limit = 5;
    result = numRescueBoats(people, limit);
    console.log(`Final result ${result}`);
    myAssert(result === 4, doQuitOnFail);
}

mainNumRescueBoats();

/*
Data range/assumptions:
people n: [1, 5 * 10^4]
limit and peple weights: [1, 3 * 10^4]
*/

/*
Tests:
n = 1
n = max
limit = 1
limit = max
heavy people
large variance in weights
*/

/*
Ideas:

Naive:
    Sort
    Put the heaviest person with the heaviest person they can go with?
    Binary search for closest to complementary value, take closest
    Time complexity:
        Sort: n log n
        Approx n * log n for binary search complement

Keep place of last binary search?
    Since if partner worked for heaviest, then <= must work for next heaviest?
*/

/*
Completion time (minutes): 24
How did it go? Pretty well
Describe:
    Idea isn't amazing but good enough
    Implemented with only a small bug
*/