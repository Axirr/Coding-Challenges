function findDifference(nums1: number[], nums2: number[]): number[][] {
    let set1:Set<number> = new Set();
    let set2:Set<number> = new Set();

    for (const num of nums1)  set1.add(num);
    for (const num of nums2)  set2.add(num);

    let unique1:number[] = [];
    let unique2:number[] = [];

    for (const num of set1) {
        if (!(set2.has(num)))  unique1.push(num)
    }
    for (const num of set2) {
        if (!(set1.has(num)))  unique2.push(num)
    }

    return [unique1, unique2];
};

function mainFindDifferent():void {
    let nums1:number[];
    let nums2:number[];
    let result:number[][];

    nums1 = [1,2,3];
    nums2 = [2,4,6];
    result = findDifference(nums1, nums2);
    for (const numArray of result) {
        for (const num of numArray)  console.log(num);
        console.log()
    }

    nums1 = [1,2,3,3];
    nums2 = [1,1,2,2];
    result = findDifference(nums1, nums2);
    for (const numArray of result) {
        for (const num of numArray)  console.log(num);
        console.log()
    }
}

mainFindDifferent();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Sort each and then look at lower one to see if equal
    Time complexity:
        nlogn sorts
        n traversal

Better:
    Turn each into a set
    Then linear traversal of each to make uniques for each
    Time complexity:
        set creation: O(n)
        traversal: n
        Better
*/

/*
Completion time (minutes): 8
Question difficulty: Easy
How did it go (0 - 6): 6
    Fast
    No bugs
    Good solution
*/