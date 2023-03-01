'use strict'

function sortArray(nums: number[]): number[] {
    if (nums.length === 1)  return nums;

    let resultNums:number[] = mergeSort(nums, 0, nums.length - 1);
    return resultNums;
};

function mergeSort(nums:number[], startIndex:number, endIndex:number): number[] {
    let resultArray:number[] = [];
    if (startIndex === endIndex) {
        resultArray = [nums[startIndex]];
    } else {
        let middleIndex:number = Math.floor((startIndex + endIndex) / 2);
        let leftArray:number[] = mergeSort(nums, startIndex, middleIndex);
        let rightArray:number[] = mergeSort(nums, middleIndex + 1, endIndex);
        let leftIndex:number = 0;
        let rightIndex:number = 0;
        while (leftIndex < leftArray.length || rightIndex < rightArray.length) {
            if (leftIndex < leftArray.length && (rightIndex >= rightArray.length || leftArray[leftIndex] <= rightArray[rightIndex]))  {
                resultArray.push(leftArray[leftIndex]);
                leftIndex += 1;
            } else {
                resultArray.push(rightArray[rightIndex]);
                rightIndex += 1;
            }
        }
    }

    return resultArray;
}

function mainSortArray(): void {
    let nums:number[];
    let sortedNums:number[];

    nums = [5,2,3,1];
    sortedNums = sortArray(nums);
    console.log(sortedNums);

    nums = [5,1,1,2,0,0]
    sortedNums = sortArray(nums);
    console.log(sortedNums);
}

mainSortArray();

/*
Data range/assumptions:
Nums length n: [1, 5 * 10^4]
Values: [-5 * 10^4, 5 * 10^4]
Solution must be n log n
*/

/*
Tests:
n = 1
n = max
nearly sorted
descedning order (i.e. backwards)
very mixed
*/

/*
Ideas:

Quick sort and merge sort are both nlogn
Merge is conceptually easier I think

Merge sort:
    Cut array in half repeatedly until length = 1
    Then return and combine
*/

/*
Did it go well? yes, quite well
If not, why?
*/