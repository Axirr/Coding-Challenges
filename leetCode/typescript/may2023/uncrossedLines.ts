import myAssert from "../march2023/Trie";

function maxUncrossedLines(nums1: number[], nums2: number[]): number {
    let windowSize:number = 0;
    if (nums1.length > nums2.length) {
        let temp = nums1;
        nums1 = nums2;
        nums2 = temp;
    }
    let n:number = nums1.length;
    let bottomUsedNums:Set<number> = new Set();
    let topUsedNums:Set<number> = new Set();
    let pairUsedNums:number[][] = [];
    let lineCount:number = 0;
    let bottomMax:number = nums2.length;
    let maxWindowSize = Math.ceil(bottomMax / 2);

    while (windowSize <= maxWindowSize) {
        for (let i = 0; i < n; i++) {
            if (topUsedNums.has(i))  continue;
            let currentTop:number = nums1[i];
            let testPoints:number[] = [i - windowSize];
            if (windowSize > 0)  testPoints.push(i + windowSize);
            let foundValidPoint:boolean = false;
            for (const point of testPoints) {
                if (point >= 0 && point < bottomMax)  {
                    foundValidPoint = true;
                    break;
                }
            }
            if (!foundValidPoint)  return lineCount;

            for (let j = 0; j < testPoints.length; j++) {
                let currentBottomIndex:number = testPoints[j]
                if (bottomUsedNums.has(currentBottomIndex))  continue;
                
                let currentBottom:number = nums2[currentBottomIndex];
                if (currentBottom === currentTop) {
                    let invalid:boolean = false;
                    if (windowSize > 0) {
                        for (const pair of pairUsedNums) {
                            let topPairIndex:number = pair[0];
                            let bottomPairIndex:number = pair[1];
                            if (i === topPairIndex || currentBottomIndex === bottomPairIndex) {
                                invalid = true;
                                break;
                            }
                            let maxIndex:number = Math.max(topPairIndex, bottomPairIndex);
                            let minIndex:number = Math.min(topPairIndex, bottomPairIndex);
                            if (maxIndex === minIndex) {
                                let otherMax:number = Math.max(i, currentBottomIndex);
                                let otherMin:number = Math.min(i, currentBottomIndex);
                                if (maxIndex >= otherMin && maxIndex <= otherMax) {
                                    invalid = true;
                                    break;
                                }
                            }

                            if (i <= maxIndex && i >= minIndex && currentBottomIndex <= maxIndex && currentBottomIndex >= minIndex || 
                                (i >= maxIndex && currentBottomIndex <= minIndex) || 
                                (i <= minIndex && currentBottomIndex >= maxIndex)) {
                                    invalid = true;
                                    break;
                            }
                        }
                    }

                    if (invalid) {
                        console.log(`match rejected`);
                        continue;
                    }

                    console.log(`Match found for top ${i} bottom ${currentBottomIndex} with values ${currentTop} and ${currentBottom}`)
                    lineCount++;
                    topUsedNums.add(i);
                    bottomUsedNums.add(currentBottomIndex);
                    pairUsedNums.push([i, currentBottomIndex]);
                }
            }
        }

        windowSize++;
        // console.log(`Window size ${windowSize}`)
    }

    return lineCount;
};

function mainMaxUncrossedLines():void {
    let nums1:number[];
    let nums2:number[];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    nums1 = [3,3,3,1];
    nums2 = [2,2,3,3];
    result = maxUncrossedLines(nums1, nums2);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    nums1 = [1,1,2,1];
    nums2 = [3,3,1];
    result = maxUncrossedLines(nums1, nums2);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);

    nums1 = [1];
    nums2 = [1, 3];
    result = maxUncrossedLines(nums1, nums2);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);

    nums1 = [1,4,2];
    nums2 = [1,2,4];
    result = maxUncrossedLines(nums1, nums2);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    nums1 = [2,5,1,2,5];
    nums2 = [10,5,2,1,5,2];
    result = maxUncrossedLines(nums1, nums2);
    console.log(`Final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);

    nums1 = [1,3,7,1,7,5];
    nums2 = [1,9,2,5,1];
    result = maxUncrossedLines(nums1, nums2);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);
}

mainMaxUncrossedLines();

/*
Data range/assumptions:
nums length n: [1, 500]
values: [1, 2000]
*/

/*
Tests:
n = 1
n = 500
no shared values
Shared values close together
Far appart
Vertical lines
No vertical lines
Need right slant not left slant lines?
Need both slant lines
*/

/*
Ideas:

Naive:
    For each pair of shard values can either
        Skip
        Use
            Eliminates any index between those numbers for future use?
                Not right
        Recursively find max

What indices does a line eliminate?
    Not as simple as "everything between"
    Can use either one of the sets, but not with ones on the other side
All vertical lines optimal?
    Could restrict options
    But can it restrict more than one?
    E.g. [1,2,3,4,5]
         [5,4,3,2,1]
         3 to 3 restricts several
         But aren't they inconsistent so it only restricts one, and thus is indifferent
         Here that's true
         Feels like always
Choice partitions into two sets of uneven arrays
Shorter lines always better?
    Work with an expanding window size?
    Seems promising but unsure if it works
Checking validity
    currentIndex
    destinationIndex
    if destinationUsedIndices.has() any indicies between current + 1 and destination, can't use

Checking isn't correct
    Can't just check one side, since lines can go either direction
Checking the pair
    If top in range, bottom has to be out of range
        In same direction of our line slant
    Vice versa for bottom

Vertical line assumption is not true
Doubt "rightmost" or "leftmost" assumption would be true
Would have to go back to trying both skip or use
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/