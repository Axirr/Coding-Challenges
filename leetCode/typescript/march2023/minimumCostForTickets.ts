import myAssert from "./Trie";

function mincostTickets(days: number[], costs: number[]): number {
    /*
    Idea: calculate for all travel days so it's trivial to calculate min
    */
    let minCostForDay:number[] = [];
    for (let i=0; i <= 366; i++)  minCostForDay.push(0);

    let currentDay:number = 365;
    let currentIndex:number = days.length - 1;
    let daysForPass:number[] = [1, 7, 30];

    while (currentDay >= 0) {
        if (currentDay === days[currentIndex]) {
            let currentMinCost:number = costs[2] + minCostForDay[Math.min(366, currentDay + 30)]

            for (let i=0; i <= 1; i++) {
                let currentCost:number = costs[i];
                let currentDaysForPass:number = daysForPass[i];
                let potentialMin:number = currentCost + minCostForDay[Math.min(366, currentDay + currentDaysForPass)];
                currentMinCost = Math.min(currentMinCost, potentialMin);
            }
            minCostForDay[currentDay] = currentMinCost;

            currentIndex -= 1;
            if (currentIndex === -1)  return currentMinCost;
        } else {
            minCostForDay[currentDay] = minCostForDay[currentDay + 1];
        }

        currentDay -= 1;
    }

    return minCostForDay[0];
}

function slowRecursiveMincostTickets(days: number[], costs: number[]): number {
    let costMap:Map<number, number> = new Map();
    let daysForPass:number[] = [1, 7, 30];
    for (let i = 0; i < costs.length; i++)  costMap.set(daysForPass[i], costs[i]);

    return recursiveHelper(days, costMap, days[0], 0);
}

function recursiveHelper(days:number[], costs:Map<number,number>, currentDay:number, currentDayIndex:number): number {
    // Base case: currentDayIndex > 365 return 0
    // console.log(`currentDay ${currentDay}`)
    if (currentDay > 365)  return 0;

    // if (currentDay > days[currentDayIndex])  {
    //     return recursiveHelper(days, costs, currentDay, currentDayIndex + 1);
    // }

    let costKeys:number[] = Array.from(costs.keys());
    let minCost:number = 365 * Math.max(...costKeys);
    let potentialMin:number;
    for (const daysForPass of costKeys) {

        let nextDay:number = currentDay + daysForPass;
        let nextDayIndex = nextValidDayIndex(nextDay, currentDayIndex, days);
        let nextDayCost:number = 0;
        if (nextDayIndex !== -1) nextDayCost = recursiveHelper(days, costs, days[nextDayIndex], nextDayIndex);
        potentialMin = costs.get(daysForPass)! + nextDayCost;
        if (potentialMin < minCost) {
            minCost = potentialMin;
        }

        // if (currentDayIndex === 0) {
        //     console.log(`days ${daysForPass}`)
        //     console.log(`potentialMin ${potentialMin}`)
        // }
    }

    // let minCost:number = costs[2] + recursiveHelper(days, costs, currentDay + 30, currentDayIndex + 1);
    // potentialMin = costs[1] + recursiveHelper(days, costs, currentDay + 7, currentDayIndex + 1);
    // minCost = Math.min(minCost, potentialMin);
    // potentialMin = costs[0] + recursiveHelper(days, costs, currentDay + 1, currentDayIndex + 1);
    // minCost = Math.min(minCost, potentialMin);

    return minCost;
}

function nextValidDayIndex(nextDay:number, currentDayIndex:number, days:number[]): number {
    let low:number = currentDayIndex;
    let high:number = days.length - 1;
    let middle:number = Math.floor((low + high) / 2);
    let nextDayIndex:number = -1;

    while (low <= high) {
        middle = Math.floor((low + high) / 2);
        if (days[middle] >= nextDay) {
            nextDayIndex = middle;
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }

    // for (let i = currentDayIndex; i < days.length; i++) {
    //     if (days[i] >= nextDay)  {
    //         nextDayIndex = i;
    //         break;
    //     }
    // }

    return nextDayIndex;
}

function dynamicMincostTickets(days: number[], costs: number[]): number {
    let rationalCosts:Map<number, number> = new Map();
    rationalCosts.set(30, costs[2]);
    if (!(costs[1] >= costs[2])) {
        rationalCosts.set(7, costs[1]);
    }
    if (!(costs[0] >= costs[1])) {
        rationalCosts.set(1, costs[0]);
    }

    let partialResults:Array<[number, number]> = new Array();
    partialResults.push([366, 0]);
    let currentDayIndex:number = days.length - 1;
    while (currentDayIndex >= 0) {
        let currentDay:number = days[currentDayIndex];

        let minCost:number = partialResults[partialResults.length - 1][1] + rationalCosts.get(30)! + 1;
        let minDay:number;
        for (const keyValuePair of rationalCosts) {
            let dayLength:number = keyValuePair[0];
            let passCost:number = keyValuePair[1];
            let newCost:number = passCost + getCostForKey(currentDay - dayLength, partialResults);
        }

        currentDayIndex--;
    }

    return partialResults[partialResults.length - 1][1];
}

function getCostForKey(maxAllowedKey:number, partialResults:Array<[number,number]>):number {
    for (let i = partialResults.length - 1; i >= 0; i--) {
        let pairDay:number = partialResults[i][0]
        let cost:number = partialResults[i][1]
        if (pairDay < maxAllowedKey)  
            return cost
    }

    return 0;
}

function mainMinCostTickets():void {
    let days:number[];
    let costs:number[];
    let resultMin:number;
    let doQuit = false;

    days = [];
    costs = [8,7,15];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 0, doQuit);

    // // Irrational single day cost that should be eliminated
    days = [1,4,6,7,8,20];
    costs = [8,7,15];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 15, doQuit);


    days = [1,4,6,7,8,20];
    costs = [2,7,15];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 11, doQuit);

    // n = 1
    days = [54]
    costs = [5,6,7];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 5, doQuit);

    // n = large
    // costs vary wildly
    // needs single day
    // needs 30 day
    days = []
    for (let i=1; i <= 365; i++) {
        days.push(i);
    }
    costs = [1, 6, 29];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 313, doQuit);
    // myAssert(resultMin === 353?, doQuit);

    // costs all same
    days = [1,2,3,4, 5,6,7,8,9,10];
    costs = [20,20,20];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 20, doQuit);

    // costs similar
    days = [1,2,3,4, 80,93,94,95,300,301,302,303,304]
    costs = [3,5,10];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    // myAssert(resultMin === 32?, doQuit);

    // needs 7 day
    days = [1,2,3];
    costs = [1,2,10];
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 2, doQuit);

    // Problems with greedy for buying 7 day on first day
    days = [2, 7, 8, 9, 10, 11]
    costs = [1, 2, 1000]
    resultMin = mincostTickets(days, costs);
    console.log(`Result: ${resultMin}`);
    myAssert(resultMin === 3, doQuit);
}

mainMinCostTickets();

/*
Data range/assumptions:
days length n: [1, 365]
    in strictly increasing order
costs length: 3
costs value: [1, 1000]
*/

/*
Tests:
n = 1
n = 365
costs vary wildly
costs all same
costs similar
needs single day
needs 7 day
needs 30 day
*/

/*
Ideas:

Naive:
    Traverse days
    Try each of the passes
    And fast forward to the next day they will definitely need another pass
    Time complexity:
        Worst case will be the single day pass
        n times
            And then 3 options each time
            3^n?
        Bad

Find candidate time periods for each pass type:
    Have to consider price
    E.g. if shorter pass is more expensive, never optimal, discard
    But the price ratio determines the number of days you need in a window to make it optimal
        E.g. 7 day pass is 2 times expensive as 1 day pass, only need 2 days in a week to make it work

When do buy a pass is problematic?
    E.g. imagine 4 days in a row
        Seems good for 7 day pass
        But what if they're all at the end of the time period, and you'd be better buying a singleton
            And then buying 7 later
        E.g. 2, 7, 8, 9, 10, 11
            Optimal (assuming reasonable pricing) is 1-day, then a 7-day
            But might be forced into greedy solution by buying a 7-day on day 2

Have to use dyanmic programming to have good complexity:
    Last travel day, would buy smallest pass not outright eliminated
    Next one, options:
        D[i + 1] = minimum of
            single + D[i]
            seven + D[i-7] or 0 if we pass the end
            month + D[i-30] or 0 if we pass the end

But don't we then have to update the in between values?
Maybe just remove them, no longer valid?
Binary search (round down) of available dates

Keep two windows:
    Travel days in next 7 days
    Travel days in next 30 days

Then maybe a running sum, that we could go back to if we wanted to buy a pass for days we had previously bought
    Potentially all the way back to the end, i.e. 0

Trace for [1,5,9] assuming only 1 and 7 day passes make sense
    Costs = [1,2]
    D[10] = 0
        First day where we don't need another ticket
        Need it as a base case
    D[9] = [1]
        Since it is cheapest
    D[5] options:
        Two singles:
            1 + 1
        Seven day:
            2 + D[min(10, 12)]
            = 2 + 0
    D[1] options:
        1 + 2
        2 + D[min(10, 8)]
            8 isn't in there, so we look for next closest, decreasing dates
        2 + D[5]
        2 + 2

How to structure partial results?
    Need to find the next closest to the max day available
    Invalidation of intermediate results means a fully filled array is a bad idea
        Would need to be updated
    Hashmap, with ordered keys?
    List with [number, number] values
        Update intermediate values by creating new list head removing those that you passed
        Necessarily sorted, so binary search could work

Little worried about this dynamic programming solution
Could recursive work with memoization and upper bound?
    Upper bound: don't explore solutions that have got to this point with a lower cost
        Would that introduce greedy problems?
        Alternatively: calculate the cost using only single day passes
            Any solution worse than that can definitely be eliminated
    Memoization:
        Again, can use the single day solutions as an upper bound

Struggling to implement dynamic
Problems:
    Initial minimum and deleting days
        Generally, when new minimum found should pop intermediate results off partials until date below current date
        But when setting the first new minimum, it may not actually be a minimum?
            If others don't offset it, it is
        Deletion should happen after all potentials have been gone through
        Then have a function (delete up to key)

Just feel like I can't implement this solution

Implemented non-dynamic, but obviously too slow
*/

/*
Completion time (minutes): 142
How did it go? very bad
Describe:
    Couldn't get dynamic working
    And yet spent a huge amount of time trying to solve it anyways
    Looked up solution but I really didn't need much over my original
        Problem I had was not calculating for each day
            Even when just retranscribing from the previous day
    Wasn't too bad once I did that
    Not worth the amount of time it took
    Have to put a limit on how long I can spend on the daily if want to make progress on side projects
    Did do some test driven development, which is good
        Once I got it working, meant I didn't have to resubmit over and over
            That's usually what this many tests means
            That I got them from LeetCode having failed them once
            But was preemptive here
*/