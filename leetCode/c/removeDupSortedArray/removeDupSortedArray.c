#include <stdio.h>

int removeDuplicates(int* nums, int numsSize){
    if (numsSize == 1) {  return 1;  }
    int i = 1;
    int val;
    int prevVal = nums[0];
    while (i < numsSize) {
        val = nums[i];
        if (val == prevVal) {
            // Found first duplicate

            int j = i + 1;
            int duplicateCount = 1;
            while (j < numsSize) {
                if (nums[j] != val) {  break;  }
                duplicateCount += 1;
                j += 1;
            }
            
            int destinationIndex = i;
            numsSize -= duplicateCount;
            // Loop could be improved without these condition checks
            while (destinationIndex < numsSize) {
                nums[destinationIndex] = nums[destinationIndex + duplicateCount];

                destinationIndex += 1;
            }
            if (i < numsSize) {  prevVal = nums[i];  }
        } else {
            prevVal = val;
        }

        i += 1;
    }
    
    return numsSize;
}

int main() {
    int myArray[] = {1, 1};
    int arraySize = 2;
    int newArraySize;
    newArraySize = removeDuplicates(myArray, arraySize);
    if (! (newArraySize == 1)) {
        printf("ERROR\n");
    }
    myArray[0] = 1;
    arraySize = 1;
    newArraySize = removeDuplicates(myArray, arraySize);
    if (! (newArraySize == 1)) {
        printf("ERROR\n");
    }
    printf("\n\n");
    int myArray2[] = {0,0,1,1,1,2,2,2,3,3,4};
    arraySize = 11;
    // int myArray2[] = {1,1,2,2,2,2,3};
    // arraySize = 7;
    newArraySize = removeDuplicates(myArray2, arraySize);
    // if (! (newArraySize == 5)) {
    //     printf("ERROR\n");
    // }
    printf("Start\n");
    for (int i = 0; i < newArraySize; i++) {
        printf("%d\n", myArray2[i]);
    }
    printf("End\n");

    return 0;
}

/*
Simple test case
[1,1]
numsSize 2
i 1
preval 1
val 1
equal
    j = 2
    count 1
    loop doesn't run
    dest 1
    numsSize = 1
    tempCount = 1
    dest 1 !< numsSize 1
    break
    1 !< 1, no new preval
i 2, broke
Correct

[0,1,2,3,3,4]
i = 3
i= 4, dup
    count 1
    check 4, not dup, break
    destination = 4
    count = 1
    nums[4] = nums[5]
[0,0,1,1,1,2,2,3,3,4]       10
[0,1,1,1,2,2,3,3,4]         9
[0,1,2,2,3,3,4]             7
[0,1,2,3,3,4]               6
[0,1,2,3,4]                 5
*/

/*
Assumptions/data range
Non-empty
Can be very long
Must be in-place
Result order matters
*/

/*
Important test cases
Single element
All elements duplicate, and long
No duplicates
Two elements, duplicates
*/

/*
Really Naive
    Traverse until find duplicate
    Shift array forward one
    Reduce length by one
    Continue
Naive
    Count duplicates in section via traversal
    Then shift everything forward by count
    Reduce length by count
    Continue until reach end
Better
    Find last duplicate by binary forward search
        Double until find not duplicate
        Then binary search in there
        Faster than regular binary search on remainder?
            Prioritizes close ones
            Regular binary search bad for e.g. just dups in a row
                Since will need full log(n)
*/