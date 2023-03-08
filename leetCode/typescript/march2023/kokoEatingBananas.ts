function minEatingSpeed(piles: number[], h: number): number {
    let minK:number = 1;
    let maxK:number = Math.max(...piles);
    let middleK:number = Math.floor(minK / 2 + maxK / 2);
    let bestK:number = maxK;

    while (minK <= maxK) {
        middleK = Math.floor(minK / 2 + maxK / 2);
        let hoursToFinish:number = finshForK(piles, middleK);

        if (hoursToFinish <= h) {
            bestK = Math.min(bestK, middleK);
            maxK = middleK - 1;
        } else  minK = middleK + 1;
    }

    return bestK;
};

function finshForK(piles:number[], eatPerHour:number):number {
    let pileIndex:number = 0;
    let totalTime:number = 0;

    while (pileIndex < piles.length) {
        let timeNeeded:number = Math.ceil(piles[pileIndex] / eatPerHour);
        totalTime += timeNeeded;

        pileIndex++;
    }

    return totalTime;
}

function mainMinEatingSpeed(): void {
    let piles:number[];
    let hours:number;
    let minimumK:number;

    piles = [30,11,23,4,20]
    hours = 5
    minimumK = minEatingSpeed(piles, hours);
    console.log(minimumK);
    console.assert(minimumK === 30);

    piles = [30,11,23,4,20]
    hours = 6
    minimumK = minEatingSpeed(piles, hours);
    console.log(minimumK);
    console.assert(minimumK === 23);

    piles = [3,6,7,11];
    hours = 8;
    minimumK = minEatingSpeed(piles, hours);
    console.log(minimumK);
    console.assert(minimumK === 4);

}

mainMinEatingSpeed();

/*
Data range/assumptions:
piles length n: [1, 10^4]
piles values: [1, 10^9]
*/

/*
Tests:
n = 1
n = 10^4
large pile values
small pile values
large minimumK result
small minimumk result
*/

/*
Ideas:

Naive:
    Binary search for answer?
    Time complexity of calculating if k is sufficient?
        Traverse piles, taking mod
        O(n)
    Binary search n * log(max)
    Calculating better max than max int
        Largest pile number must be sufficient if problem possible
*/

/*
Did it go well? yes
If not, why?
    Used the same technique as yesterday
    A few debugging issues, but not too bad
*/