function sortArray(nums:number[]):number[] {
    if (nums.length === 1)  return nums;

    quickSort(nums, 0, nums.length - 1);
    return nums;
}

function quickSort(nums:number[], startIndex:number, endIndex:number) {
    if ((endIndex - startIndex) === 1) {
        if (nums[startIndex] >= nums[endIndex]) {
            let temp:number = nums[startIndex];
            nums[startIndex] = nums[endIndex];
            nums[endIndex] = temp;
        }
        return;
    }

    // Not sure if middle or random is better
    // let pivotIndex:number = Math.floor((startIndex + endIndex) / 2);
    let pivotIndex:number = Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;

    let i:number = endIndex;
    let noChange:boolean;
    let temp:number;
    while (i >= startIndex) {
        noChange = true;
        if (i > pivotIndex) {
            if (nums[i] <= nums[pivotIndex]) {
                noChange = false;
                temp = nums[i];
                nums[i] = nums[pivotIndex + 1]
                nums[pivotIndex + 1] = nums[pivotIndex]
                nums[pivotIndex] = temp;
                pivotIndex += 1;
            }
        } else if (i < pivotIndex) {
            if (nums[i] > nums[pivotIndex]) {
                noChange = false;
                temp = nums[i];
                nums[i] = nums[pivotIndex - 1];
                nums[pivotIndex - 1] = nums[pivotIndex];
                nums[pivotIndex] = temp;
                pivotIndex -= 1;
            }
        }
        if (noChange)  i-= 1;
    }
    if (pivotIndex - 1 > startIndex)  quickSort(nums, startIndex, pivotIndex - 1);
    if (pivotIndex + 1 < endIndex)  quickSort(nums, pivotIndex + 1, endIndex);
}

function mainSortArray(): void {
    let nums:number[];
    let sortedNums:number[];

    nums = [-1,2,-8,-10];
    sortedNums = sortArray(nums);
    console.log(sortedNums);

    nums = [5,2,3,1];
    sortedNums = sortArray(nums);
    console.log(sortedNums);

    nums = [5,1,1,2,0,0]
    sortedNums = sortArray(nums);
    console.log(sortedNums);

}

mainSortArray();

/*
General understanding of algorithm:
Partition into two parts through choice of pivot
Ensure all in bottom half are lower than pivot
Opposite for top half
Repeat recursively on each half
Swap process:
    Work down from top
    Until hit pivot, checking that ith element is greater than pivot
        If not, swap move pivot up one and put ith value in old pivot place
            Don't decrement i though, since we need to check that value still
    Once below pivot, similar
        If too big, swap with last lower, then swap pivot and it
*/