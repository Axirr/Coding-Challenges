/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_INT_VAL 10001

void expandAndBuildAround(int* originalArray, int originalSize, int midPointIndex, int kSliceSize, int value, int* resultArray, bool isSelf);
int binarySearchClosest(int* arr, int arrSize, int val);
int binarySearchLowestInstance(int* arr, int arrSize, int low, int high, int val);
int binarySearchHighestInstance(int* arr, int arrSize, int low, int high, int val);
bool isCloser(int i1, int i2, int val);

int* findClosestElements(int* arr, int arrSize, int k, int x, int* returnSize){
    int* resultArray;
    resultArray = malloc(sizeof(int) * k);
    int binarySearchIndex = binarySearchClosest(arr, arrSize, x);

    int closestValue = x;
    bool isSelf = true;
    if (arr[binarySearchIndex] != x) {
        closestValue = arr[binarySearchIndex];
        isSelf = false;
    }
    // printf("%d\n", arr[binarySearchIndex]);

    // Find lowest instance, and calculate mid instance
    int lowestInstanceIndex = binarySearchLowestInstance(arr, arrSize, 0, binarySearchIndex, closestValue);
    // printf("%d\n", lowestInstanceIndex);

    // Find highest instance
    int highestInstanceIndex = binarySearchHighestInstance(arr, arrSize, binarySearchIndex, arrSize - 1, closestValue);
    // printf("%d\n", highestInstanceIndex);

    int midPointIndex = (lowestInstanceIndex + highestInstanceIndex) / 2;


    // Expand around midIndex k times
    expandAndBuildAround(arr, arrSize, midPointIndex, k, x, resultArray, isSelf);

    *returnSize = k;
    return resultArray;
}

void expandAndBuildAround(int* originalArray, int originalSize, int midPointIndex, int kSliceSize, int value, int* resultArray, bool isSelf) {
    int leftIndex = midPointIndex;
    int rightIndex = midPointIndex + 1;
    int* leftArray = malloc(sizeof(int) * originalSize);
    int* endLeft = leftArray;
    int leftCount = 0;
    int* rightArray = malloc(sizeof(int) * originalSize);
    int* endRight = rightArray;
    int rightCount = 0;
    while (leftIndex >= 0 && rightIndex < originalSize && kSliceSize > 0) {
        if (isCloser(originalArray[rightIndex], originalArray[leftIndex], value)) {
            *endRight = originalArray[rightIndex];
            rightCount += 1;
            endRight += 1;
            rightIndex += 1;
        } else {
            *endLeft = originalArray[leftIndex];
            endLeft += 1;
            leftCount += 1;
            leftIndex -= 1;
        }
        kSliceSize -= 1;
    }

    if (kSliceSize > 0) {
        if (leftIndex >= 0) {
            while (kSliceSize > 0) {
                *endLeft = originalArray[leftIndex];
                endLeft += 1;
                leftIndex -= 1;
                leftCount += 1;
                kSliceSize -= 1;
            }
        } else {
            while (kSliceSize > 0) {
                *endRight = originalArray[rightIndex];
                endRight += 1;
                rightIndex += 1;
                rightCount += 1;
                kSliceSize -= 1;
            }
        }
    }

    endLeft -= 1;
    while (leftCount > 0) {
        *resultArray = *endLeft;
        resultArray += 1;
        endLeft -= 1;
        leftCount -= 1;
    }
    int* copyRightArrayPointer = rightArray;
    while (rightCount > 0) {
        *resultArray = *copyRightArrayPointer;
        resultArray += 1;
        copyRightArrayPointer += 1;
        rightCount -= 1;
    }

    // Backwards through left

    // Forwards through right

    free(leftArray);
    free(rightArray);

    /*
    Original idea was flawed
        Not always equal around the center
    Can do it easily without sorting
        Compare left to right, take the lowest or left
        But don't want to have to sort after the fact
    Could use two temporary arrays
        rightArray would be normal
        leftArray would be backwards
    Construct resultArray from backwards iteration through leftArray plus forward through right
        time: 2 * k
        space: 3x
            Feels ugly, but fine
        Sorting would be k log(k)
    */


    // int numLowest;
    // int numHighest;
    // if (isSelf) {
    //     numLowest = kSliceSize / 2 + kSliceSize % 2;
    //     numHighest = (kSliceSize / 2) - 1;
    // } else {
    //     numLowest = (kSliceSize / 2 + kSliceSize %2) - 1;
    //     numHighest = kSliceSize / 2;
    // }
    // // int lowestIndex = midPointIndex - (numLowest - 1);
    // int lowestIndex = midPointIndex - numLowest;
    // int highestIndex = midPointIndex + numHighest;
    // printf("Lowest index is %d and highest is %d\n", lowestIndex, highestIndex);
    // if (lowestIndex < 0) {
    //     highestIndex += abs(lowestIndex);
    //     lowestIndex = 0;
    // } else if (highestIndex >= originalSize) {
    //     lowestIndex -= (highestIndex - originalSize) + 1;
    //     // lowestIndex = midPointIndex - (numLowest - 1);
    //     highestIndex = originalSize - 1;
    // }
    // printf("Lowest index is %d and highest is %d\n", lowestIndex, highestIndex);

    // while (lowestIndex <= highestIndex) {
    //     *resultArray = originalArray[lowestIndex];

    //     resultArray += 1;
    //     lowestIndex += 1;
    // }
}

bool isCloser(int i1, int i2, int val) {
    int distance1 = abs(i1 - val);
    int distance2 = abs(i2 - val);

    if (distance1 < distance2) {  return true;  }
    else if (distance2 < distance1) {  return false;  }
    else if (i1 <= i2) { return true;  }
    else {  return false;  }
}

int binarySearchClosest(int* arr, int arrSize, int val) {
    int resultIndex = -1;
    int low = 0;
    int high = arrSize - 1;
    int mid;
    int minDistance = arrSize + 1;
    int currentDistance;
    int closestValue = MAX_INT_VAL;
    while (high >= low) {
        mid = (high + low) / 2;
        if (arr[mid] == val) {
            return mid;
        } else {
            currentDistance = abs(val - arr[mid]);
            if (currentDistance < minDistance || (currentDistance == minDistance && arr[mid] < closestValue)) {
                minDistance = currentDistance;
                resultIndex = mid;
                closestValue = arr[mid];
            }
            if (arr[mid] > val) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
    }

    return resultIndex;
}

int binarySearchLowestInstance(int* arr, int arrSize, int low, int high, int val) {
    int lowestInstanceIndex = arrSize;
    int mid;
    while (high >= low) {
        mid = (high + low) / 2;
        if (arr[mid] == val) {
            lowestInstanceIndex = mid;
            high = mid - 1;
        } else if (arr[mid] < val) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return lowestInstanceIndex;
}

int binarySearchHighestInstance(int* arr, int arrSize, int low, int high, int val) {
    int highestInstanceIndex = -1;
    int mid;
    while (high >= low) {
        mid = (high + low) / 2;
        if (arr[mid] == val) {
            highestInstanceIndex = mid;
            low = mid + 1;
        } else if (arr[mid] < val) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return highestInstanceIndex;
}


int main() {
    // int myArr[] = {1,2,3,4};
    // int myArr[] = {1,2,3,3,4};
    // int myArr[] = {1,2,6,7};
    int arrSize;
    int searchValue;
    int k;
    int* resultArray;
    int* resultSize = malloc(sizeof(int));

    int myArr[] = {1,2,3,4,5};
    arrSize = 5;
    searchValue = -1;
    k = 4;
    resultArray = findClosestElements(myArr, arrSize, k, searchValue, resultSize);

    // int myArr2[] = {0,1,1,1,2,3,6,7,8,9};
    // arrSize = 10;
    // searchValue = 4;
    // k = 9;
    // resultArray = findClosestElements(myArr2, arrSize, k, searchValue, resultSize);

    int i = 0;
    printf("ResultSize %d\n", *resultSize);
    printf("START\n");
    while (i < *resultSize) {
        printf("%d\n", resultArray[i]);
        i += 1;
    }
    printf("END\n");

    free(resultSize);
    free(resultArray);

    return 0;
}

/*
Data range/assumptions
Non-empty
Very long -> malloc needed
Large number range
There are at least k elements in the array
"Close" measure favours lower element in case equidistant
*/

/*
Important test cases:
Single item list
k = arrSize
Check lower selected over higher when equidistant
Large number range works for scale
x very far away from arr elements?
x not in the list
*/

/*
Naive:
    Traverse
    Maintain list of closest (and distance), sorted by closest and lower first
    If newElement closer than last element
        Pop
        Insert newElement at proper place (not always last) 
    Time complexity:
        k * n
        Would be alright for small k, approx n
        But large k would make it k * n
        Worst case k = n -> n^2, too slow
Better:
    List is sorted
    Binary search for x
        Keep index and minimum distance from x
        If tied, keep lowest index?
            Doesn't matter, will need to find high and low of that value
            Same problem as X, all need to be included before any others
    if found:
        minDistanceVal = x
    else:
        val = minDistanceVal
    lowestValIndex = binaryFindLowestVal(arr, arrSize, val)
    highestValIndex = binaryFindHighestVal(arr, arrSize, val)
    lowMidPoint = (highestValIndex + lowestValIndex) / 2;
    malloc(resultArray[k]);
    // if (highestValIndex - lowestValIndex >= k)
    //     write val to resultArray k times
    // else:
    middleValueIndex = floor(highestValIndex + lowestValIndex / 2)
    expandFunction(middleValueIndex, resultArray)
    return resultArray;
    
    expandFunction(lowIndex, highIndex, k)
        # lowIndex can equal highIndex
        # Better to deal with the val = x separately
            # Can use binary search to find top and bottom quickly, and then just make the x elements list by multiplication
                # Actually that may not be possible in C/anything
        Calculate low indices and high we will use
        Calc numLowest
            numLowest = ceil(k/2), if possible
            numHighest = floor(k/2), if possible
            # Only one can be true
            if (lowIndex - numLowest < 0):
                Add difference to high num
            elif (highIndex - numHighest) >= arrSize:
                Add difference to low num
        lowest = lowIndex - numLowest
        highest = min(x.index + floor(k/2), arrSize - 1)
        go from lowest to highest and should be able to get them pre-sorted
    
    lowestInstance(array, arrSize, val):
        low = 0
        high = arrSize
        lowestInstance = arrSize
        while (high >= low):
            mid = (high + low) / 2
            if arr[mid] == val:
                lowestInstance = mid
                high = mid - 1
            elif too low:
                low = mid + 1
            elif too high:
                high = mid - 1
        return lowestInstance
    
    highestInstance(array, arrSize, val):
        # Same as above, but low = mid + 1 in equality case
    

    Sanity check:
    Does it make sense
        X in List: yes
            Should be able to find highX and lowX
            And expand function can work for two indices instead of one
        X not in List: yes
            Restructured so it now works the same as X
    
    Time complexity:
    logn        ->  binarySearch(x)
    logn        -> lowestInstance(val)
    logn        -> highestInstance(val)
    k           ->  expandFunction
    3logn + k               -> O(logn)      or O(k)
    Worst case: 3 logn + n  -> O(n)

Cleaned up:
    

    Test theory:
    [1,2,6,7]
    looking for 3, so 2 is closest
    binary search
    minIndex;
    minDistance = max_INT;
    i 1
    2, too low
    i 2
    (3 - 2) < max_INT, so keep
    i = 2
    distance  1
    6, too high
    6 - 3 !< 1, so don't keep
    low > high, break
    use 2
    Include 2?
    2, 1, 6, 7
    sort
*/