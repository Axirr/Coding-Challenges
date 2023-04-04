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

    people = [3,2,2,1];
    limit = 3;
    result = numRescueBoats(people, limit);
    console.log(`Final result ${result}`);
    myAssert(result === 3, doQuitOnFail);

    people = [1,2];
    limit = 3;
    result = numRescueBoats(people, limit);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitOnFail);

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

Need to improve deletion of used people
Minheap?
    Swap second max with used node, then sift up second max each time
    logn operation instead of n

Stack, pair nodes as one finds appropriate ones?
    If current max of "smalls" is too low, push heavy to stack and try next one?
    Problem: to ensure optimality, heaviest has to take priority?
    But if we only try the heaviest light one
    What are these "light ones", formally?
        Bottom half
            But not always
            E.g. uniform weight
    Once push top half to stack, begin single boating or pairing with the smallest
Seems intriguing but not sure if it works
What happens after the first one?
Trace: people [1, 2, 8, 9, 10] limit 10
    Bottom: Math.ceil(length / 2)
        For odd length, should always single boat the top one?
            If it could be paired, anything below it could be paired
    Bottom: [1, 2]
    Top: [8, 9]
    Stack: []
    9 vs. 2, nope
    Stack: [9]
    8 + 2, yep
    Pop from stack for next if not empty
    9 + 1, yep

Close, but some problems

Seemed close, but I just can't get it to work
Paths seem hard to disentangle
Is it possible to always prioritize the stack whenever need a new one?
    Was original idea, but causes infinite loop problems I think
        If always do it, just add to stack and immediately take it back off
Go into a second control flow the second you add something to the stack?
    Now, go all the way to the bottom until find a match
    If no match found, add stack.length to boat
Maybe the issue is my "two halves" idea
    Simpler: from currentIndex, go down until pair happens or reach 0
    Break at 0 and add the stack length

Never did get it to work
    Just programming in circles
    Waste of time
*/

/*
Completion time (minutes): 24
How did it go? Pretty well
Describe:
    Idea isn't amazing but good enough
    Implemented with only a small bug
*/