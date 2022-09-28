#include <stdio.h>
int binarySearchLastDoesExist(int* myArray, int startIndex, int arraySize, int value);
int frontBinarySearchLastDoesExist(int* myArray, int startIndex, int arraySize, int value);
int maxInt(int int1, int int2);

int removeDuplicates(int* nums, int numsSize){
    if (numsSize == 1) {  return 1;  }
    int i = 1;
    int val;
    int prevVal = nums[0];
    while (i < numsSize) {
        val = nums[i];
        if (val == prevVal) {
            // Found first duplicate

            // int j = i + 1;
            // int duplicateCount = 1;
            // while (j < numsSize) {
            //     if (nums[j] != val) {  break;  }
            //     duplicateCount += 1;
            //     j += 1;
            // }

            // int duplicateCount = binarySearchLastDoesExist(nums, i, numsSize, val) - (i - 1);
            int duplicateCount = frontBinarySearchLastDoesExist(nums, i, numsSize, val) - (i - 1);
            
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

// Function assumes value exists
int binarySearchLastDoesExist(int* myArray, int startIndex, int arraySize, int value) {
    int returnIndex = -1;
    int highIndex = arraySize - 1;
    int lowIndex = startIndex;
    int midIndex;
    int midValue;
    while (highIndex >= lowIndex) {
        midIndex = (highIndex + lowIndex) / 2;
        midValue = myArray[midIndex];
        if (midValue > value) {
            highIndex = midIndex - 1;
        } else if (midValue < value) {
            lowIndex = midIndex + 1;
        } else {
            returnIndex = maxInt(midIndex, returnIndex);
            lowIndex += 1;
        }
    }
    return returnIndex;
}

// Function assumes value exists
int frontBinarySearchLastDoesExist(int* myArray, int startIndex, int arraySize, int value) {
    int returnIndex = -1;
    int highIndex = arraySize - 1;
    int lowIndex = startIndex;
    int firstTestIndex = (arraySize - startIndex) / 10;
    if (myArray[firstTestIndex] > value) {
        highIndex = firstTestIndex - 1;
    } else { lowIndex = firstTestIndex;  }
    int midIndex;
    int midValue;
    while (highIndex >= lowIndex) {
        midIndex = (highIndex + lowIndex) / 2;
        midValue = myArray[midIndex];
        if (midValue > value) {
            highIndex = midIndex - 1;
        } else if (midValue < value) {
            lowIndex = midIndex + 1;
        } else {
            returnIndex = maxInt(midIndex, returnIndex);
            lowIndex += 1;
        }
    }
    return returnIndex;
}

int maxInt(int int1, int int2) {
    if (int1 >= int2) {  return int1;  }
    return int2;
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
    if (! (newArraySize == 5)) {
        printf("ERROR\n");
    }
    // printf("Start\n");
    // for (int i = 0; i < newArraySize; i++) {
    //     printf("%d\n", myArray2[i]);
    // }
    // printf("End\n");

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
Better?
    Find last duplicate by binary forward search
        Double until find not duplicate
        Then binary search in there
        Faster than regular binary search on remainder?
            Prioritizes close ones
            Regular binary search bad for e.g. just dups in a row
                Since will need full log(n)
    Worst case time complexity like worse
        Worse case: number at the far end of a long array
        Will take time to build up to get there
        And last range will be large?
            Which we have to binary search over
            E.g. 1 2 4 8 ... 1024, and we reach end
                So we know it's between 512 and 1024
                    Binary search log(512)
            Normal binary search:
                log(1024)
                So only avoided one level of the tree
                But did a fair amount of extra work
        For some work loads it would be better
        Possibly better if those work loads are more common
        But that might be hard to know
        And the algorithm has more variance now
        Would have to have a significant advantage
    Construct random work loads with a larger or smaller range of numbers
        Smaller range = longer dups, likely to favour normal BS
Better?
    Alternate binary search and search one higher?
*/