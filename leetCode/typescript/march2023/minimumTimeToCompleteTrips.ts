function minimumTime(time: number[], totalTrips: number): number {
    if (time.length === 1)  return totalTrips * time[0];

    time.sort((a, b) => a - b);
    let timeMin:number = 0;
    let timeMax:number = Math.ceil(totalTrips * time[time.length - 1])
    let middleTime:number = Math.floor(timeMin / 2 + timeMax / 2);
    // Time max is a worst case so we know we can set it as a valid result
    let result:number = timeMax;

    while (timeMin <= timeMax) {
        // Middle calculated in this way to avoid overflow
        middleTime = Math.floor(timeMin / 2 + timeMax / 2);

        let tripsForTime:number = minTripsForTime(time, middleTime);
        if (tripsForTime >= totalTrips) {
            timeMax = middleTime - 1;
            result = Math.min(result, middleTime)
        } else {
            timeMin = middleTime + 1;
        }
    }

    return result;
};

function minTripsForTime(time:number[], totalTime:number) {
    let totalTrips = 0;
    for (let i = 0; i < time.length; i++) {
        const element = time[i];
        let tripsForElement:number = Math.floor(totalTime / element);
        if (tripsForElement === 0) break;
        totalTrips += tripsForElement;
    }

    return totalTrips;
}

// Bad attempted version before looking up solution
    // if (time.length === 1)  return Math.ceil(time[0] * totalTrips);

    // let numberCount:Map<number, number> = new Map<number, number>();
    // for (let i = 0; i < time.length; i++) {
    //     const element = time[i];
    //     if (numberCount.has(element))  numberCount.set(element, numberCount.get(element)! + 1);
    //     else  numberCount.set(element, 1)
    // }
    // time.sort((a, b) => a - b);
    // console.log(time);
    // let noDups:number[] = [time[0]];
    // for (let i = 0; i < time.length; i++) {
    //     const element = time[i];
    //     if (noDups[noDups.length - 1] !== element)  noDups.push(element);
    // }

    // return recursiveWindow(noDups, numberCount, noDups.length - 1);

    // let currentIndex = 0;
    // let totalCount = 0;
    // let sumValues = 0;
    // let endIndex = noDups.length - 1;
    // // let totalTime:number = Math.ceil(totalTrips / (noDups[1] * numberCount.get(1)!));
    // let totalTime:number = -1;
    // while (currentIndex <= endIndex) {
    //     let count = numberCount.get(noDups[currentIndex])!
    //     totalCount += count;
    //     sumValues += count * noDups[currentIndex];
    //     let avgValue = sumValues / totalCount;
    //     totalTime = Math.floor(totalTrips / totalCount) * avgValue;
    //     console.log(`Totaltime ${totalTime}`)
    //     while (noDups[endIndex] > totalTime)  endIndex--;

    //     currentIndex++;
    // }

    // return totalTime;

function mainMinTime(): void {
    let time:number[];
    let totalTrips:number;
    let timeMin:number;

    time = [9,7,10,9,10,9,10];
    totalTrips = 1;
    timeMin = minimumTime(time, totalTrips);
    console.log(`Min Time ${timeMin}`)
    console.assert(timeMin === 7);
    return;

    time = [9,3,10,5];
    totalTrips = 2;
    timeMin = minimumTime(time, totalTrips);
    console.log(`Min Time ${timeMin}`)
    console.assert(timeMin === 5);

    time = [5,10,10];
    totalTrips = 9;
    timeMin = minimumTime(time, totalTrips);
    console.log(`Min Time ${timeMin}`)
    console.assert(timeMin === 25);

    time = [2];
    totalTrips = 1;
    timeMin = minimumTime(time, totalTrips);
    console.log(`Min Time ${timeMin}`)
    console.assert(timeMin === 2);

    time = [1,2,3];
    totalTrips = 5;
    timeMin = minimumTime(time, totalTrips);
    console.log(`Min Time ${timeMin}`)
    console.assert(timeMin === 3);
}

mainMinTime();

/*
Data ranges/assumptions:
time length n: [1, 10^5]
Each time value is how long a different bus takes to complete it's trips
time values: [1, 10^7]
totalTrips k: [1, 10^7]
*/

/*
Tests:
n = 1
n = 10^5
varied times
all same time
all one bus
need multiple buses
*/

/*
Ideas:

Naive:
    Increment time
    Traverse reaminting time bus list to determine what trips finished
    Check if finished trips equals totalTrips

Better:
    Traverse list and group trips into factor families
        Probably in a hash table
    E.g. these all finish on 3, these all finish on 6
    Then each increment, just check if number in hash and increment accordingly
        Would have to do it with modulus though?
        No, just include all lower families in higher families
            E.g. group 3 triggers on 3, but also on 6
        But then can only include the highest one or will double include
            E.g. for 12, 6 includes 3
                6 is the endpoint of 3 currently
                    But not for everything
                XOR favouring the larger
    Seems promising, but how exactly to do?

    Worst case: all primes
        No savings

Other better:
    Sort list
    Determine how many trips needed using only smallest
    Can then exclude any in list larger than that, because they won't finish
        Exclude with an endIndex, not deletion
    Iteratively expand until reach end of list?
        I.e. endIndex has ruled out next item
    Worst case:
        All the same number?
        Could be solved if counted duplicates and removed
    Formula with counting:
        smallest/first item: totalTrips / item[0] * count[item[0]], round up

Can the next step be calculated dynamically from the last?
    E.g. [1,2,3], trips = 5
        Total time using only 1 is 5
        Adding 2 in, ratio of 2 means we will do 1.5 times as many trips
        Easy enough for one step, but how to generalize?
            Average trip time?
            Simply add it to the average?
                Feels like rounding is going to be a problem
            So at 1.5, 5 / 1.5 = 3.33, round up to 4
            Next average is 6 / 3 = 2
            We need 2 * 3 units of time to >= 5

[5, 10, 10] case
    i = 0, avg = 5, time = 45
    i = 1, avg = 8.33, time = 

Approach is fundamentally flawed in some respects:
    Average is not descriptive enough because of discrete nature of contributions
    Could provide a bound to use
        I.e. average only works when returned time has allowed everything to finish
        After that, we could forward iterate using the smallest values again
            Recursive, same process on the difference?
            Base case terminates in two ways:
                Minimum time includes only things that cleanly terminate
                Only one item included in minimum time, and therefore average issue doesn't apply
Algorithm:
    Calculate naive average
    If naive average doesn't go cleanly into biggest
        Calculate the part that does, and the difference remaining
        Recursively run on the difference excluding biggest
            Using average from the smaller ones?
But does this get us the optimal?
    Is excluding biggest okay?
        Probably not always
    Average gets us the minimum for the best case scenario of everything contributing
    Removing the biggest could have a huge effect on the average
Upper bound: we have to include another biggest
    Which would include everything else, and make the average valid
Lower bound: can be dealt with without another instance of the biggest
    But possibly next biggest
Maybe need a whole new structure
    Start using whole array, and using everything at least once
    Record currentMinTime, and then try again without biggest
    As soon as a minimumTime result is larger than the last, we've found a minimum?
        Not a safe assumption
            E.g. next smallest is almost as big, so we get very little savings and it is actually worse
        Maybe just keep running down
This could be done with a rolling average for the no duplicates list?
    To establish a lower bound, that we would then work up from with the smaller entries
Feels like it should work but seems hard

Don't think this will work, still has the same average problem but pushes it down the road
    Since biggest one not finishing doesn't guarantee next biggest will finish

Different strategy:
    Rather than increments of time = 1, bifurcate data into ranges that we can increment for a larger number
*/

/*
Did it go well? no
If not, why?
    Tried a solution that I knew had issues
        I.e. averages don't capture discrete nature of problem
    Had to look up solution
*/