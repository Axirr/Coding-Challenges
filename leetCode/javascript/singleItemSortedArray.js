/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
    if (nums.length == 1)  return nums[0];

    let low = 0;
    let high = nums.length - 1;
    let middle = Math.floor((low + high) / 2);

    while (low < high) {
        middle = Math.floor((low + high) / 2);
        if (middle === 0) {
            if (nums[middle] !== nums[1])  return nums[middle]
        } else if (middle === nums.length) {
            if (nums[middle] !== nums[middle - 1])  return nums[middle]
        } else {
            if (nums[middle] !== nums[middle - 1] && nums[middle] !== nums[middle + 1])  { 
                return nums[middle]; 
            }
            if (middle % 2 !== 0) {
                if (nums[middle] !== nums[middle - 1])  {
                    high = middle - 1
                } else { low = middle + 1}
            } else {
                if (nums[middle] !== nums[middle + 1])  {
                    high = middle - 1
                } else { low = middle + 1; }
            }
        }
    }
    return nums[Math.floor((low + high) / 2)];
};

function mainSingleNonDuplicate() {
    let nums;
    let uniqueElement;

    nums = [3,3,7,7,10,11,11];
    uniqueElement = singleNonDuplicate(nums);
    console.log(uniqueElement);
    console.assert(uniqueElement === 10);

    nums = [1,1,2,3,3,4,4,8,8];
    uniqueElement = singleNonDuplicate(nums);
    console.log(uniqueElement);
    console.assert(uniqueElement === 2);

}

mainSingleNonDuplicate();

/*
Data range/assumptions:
nums length n: [1, 10^5]
values: [0, 10^5]
must run in logn time, o(1) space
*/

/*
Tests:
n = 1
n = 10^5
single item by front, middle, back
last item is single
first item is single
*/

/*
Ideas:

Naive (doesn't meet time spec):
    Count items in dictionary, removing item when gets to 2
    Time and space complexity: O(n)

Logn and sorted suggests binary search?

Determine offset location
    Until single item occurs, pairs should be on odd, even pairing

Binary search, looking at triplet
    If neither equals, middle, that's result
    Otherwise, if odd, even for the pair, single is behind
        high = middle + 1
    Else low = middle + 1

Elegant way to deal with back or front where one of the triplets doesn't exist?
*/

/*
Did it go well? yes
    A little slow on debugging
    But got idea fast and implemented fairly well
If not, why?
*/