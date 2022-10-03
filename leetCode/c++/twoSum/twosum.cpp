#include <vector>
#include <utility>
#include <iostream>
#include <algorithm>
#include <chrono>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<pair<int,int>> numsCopy = mergeSort(nums, 0, nums.size() - 1);
        sort(numsCopy.begin(), numsCopy.end());

        int element;
        vector<int> resultVector;
        int i;
        int searchIndex;
        for (i = 0; i < numsCopy.size(); i++) {
            element = numsCopy[i].first;
            // Check not needed, since solution guaranteed
            // if (element > target) {  break;  }
            searchIndex = binarySearch(numsCopy, 0, numsCopy.size() - 1, target - element);
            if (searchIndex != -1) {
                resultVector.push_back(numsCopy[i].second);
                if (element != (target - element)) {
                    resultVector.push_back(numsCopy[searchIndex].second);
                } else {
                    searchIndex = binarySearch(numsCopy, i + 1, numsCopy.size() - 1, target - element);
                    resultVector.push_back(numsCopy[searchIndex].second);
                }
                break;
            }
        }
        // vector<int>::iterator searchIterator = find(nums.begin(), nums.end(), element);
        // resultVector.push_back(distance(nums.begin(), searchIterator));
        // if (element != (target - element)) {
        //     searchIterator = find(nums.begin(), nums.end(), target - element);
        //     resultVector.push_back(distance(nums.begin(), searchIterator));
        // } else {
        //     searchIterator = find(searchIterator+1, nums.end(), target - element);
        //     resultVector.push_back(distance(nums.begin(), searchIterator));
        // }
        // cout << "test\n";
        return resultVector;
    }

    int binarySearch(vector<pair<int,int>>& myVector, int start, int end, int myValue) {
        int resultInt = -1;
        int low = start;
        int high = end;
        int mid;
        while (high >= low) {
            mid = (high + low) / 2;
            if (myVector[mid].first == myValue) {
                resultInt = mid;
                break;
            } else if (myVector[mid].first < myValue) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return resultInt;
    }

    vector<pair<int, int>> mergeSort(vector<int> myVector, int start, int end) {
        if (start > end) {
            vector<pair<int,int>> tempVecPair;
            return tempVecPair;
        }
        // Base case: len 1, return [0]
        if (start == end) {
            // cout << "base case\n";
            pair<int, int> myPair = pair(myVector[start], start);
            return vector{myPair};
        }

        // Make left
        // Make right
        // cout << "start " << start << "\n";
        // cout << "end " << end << "\n";
        int mid = (start +  end) / 2;
        vector<int> left;
        vector<int> right;
        for (int i = start; i <= end; i++) {
            if (i <= mid) {
                left.push_back(myVector[i]);
            } else {
                right.push_back(myVector[i]);
            }
        }

        // Sort left
        // Sort right
        vector<pair<int,int>> leftResult = mergeSort(myVector, start, mid);
        vector<pair<int,int>> rightResult = mergeSort(myVector, mid + 1, end);

        vector<pair<int,int>> mergedResult = merge(leftResult, rightResult);
        return mergedResult;
    }

    vector<pair<int,int>> merge(vector<pair<int,int>> left, vector<pair<int,int>> right) {
        vector<pair<int,int>> mergedResult;
        vector<pair<int,int>>::iterator leftCurrent = left.begin();
        vector<pair<int,int>>::iterator rightCurrent = right.begin();

        while(leftCurrent != left.end() && rightCurrent != right.end()) {
            if ((*leftCurrent).first <= (*rightCurrent).first) {
                mergedResult.push_back(*leftCurrent);
                leftCurrent = leftCurrent+1;
            } else {
                mergedResult.push_back(*rightCurrent);
                rightCurrent = rightCurrent+1;
            }
        }

        while(leftCurrent != left.end()) {
            mergedResult.push_back(*leftCurrent);
            leftCurrent = leftCurrent+1;
        }

        while(rightCurrent != right.end()) {
            mergedResult.push_back(*rightCurrent);
            rightCurrent = rightCurrent+1;
        }

        return mergedResult;
    }

    vector<int> mergeSortSingle(vector<int> myVector, int start, int end) {
        if (start > end) {
            vector<int> tempVecPair;
            return tempVecPair;
        }
        // Base case: len 1, return [0]
        if (start == end) {
            // cout << "base case\n";
            int myInt = myVector[start];
            return vector{myInt};
        }

        // Make left
        // Make right
        // cout << "start " << start << "\n";
        // cout << "end " << end << "\n";
        int mid = (start +  end) / 2;
        vector<int> left;
        vector<int> right;
        for (int i = start; i <= end; i++) {
            if (i <= mid) {
                left.push_back(myVector[i]);
            } else {
                right.push_back(myVector[i]);
            }
        }

        // Sort left
        // Sort right
        vector<int> leftResult = mergeSortSingle(myVector, start, mid);
        vector<int> rightResult = mergeSortSingle(myVector, mid + 1, end);

        vector<int> mergedResult = mergeSingle(leftResult, rightResult);
        return mergedResult;
    }

    vector<int> mergeSingle(vector<int> left, vector<int> right) {
        vector<int> mergedResult;
        vector<int>::iterator leftCurrent = left.begin();
        vector<int>::iterator rightCurrent = right.begin();

        while(leftCurrent != left.end() && rightCurrent != right.end()) {
            if (*leftCurrent <= *rightCurrent) {
                mergedResult.push_back(*leftCurrent);
                leftCurrent = leftCurrent+1;
            } else {
                mergedResult.push_back(*rightCurrent);
                rightCurrent = rightCurrent+1;
            }
        }

        while(leftCurrent != left.end()) {
            mergedResult.push_back(*leftCurrent);
            leftCurrent = leftCurrent+1;
        }

        while(rightCurrent != right.end()) {
            mergedResult.push_back(*rightCurrent);
            rightCurrent = rightCurrent+1;
        }

        return mergedResult;
    }
  
    // COPIED FROM INTERNET FOR COMPARISON
    // Function to sort an array using 
    // insertion sort
    void insertionSort(vector<int> arr, int n) 
    { 
        int i, key, j; 
        for (i = 1; i < n; i++)
        { 
            key = arr[i]; 
            j = i - 1; 
    
            // Move elements of arr[0..i-1],  
            // that are greater than key, to one 
            // position ahead of their 
            // current position
            while (j >= 0 && arr[j] > key)
            { 
                arr[j + 1] = arr[j]; 
                j = j - 1; 
            } 
            arr[j + 1] = key; 
        } 
    } 

};

int main() {
    Solution mySolution = Solution();
    vector<int> myVector;
    // vector<int> myVector = vector{3,2};
    int myTarget = 5;
    vector<int> myResult;
    for (int i = 0; i < 90000; i++) {
        myVector.push_back(rand() % 1000);
    }
    // for (int i = 0; i < myVector.size(); i++) {
    //     cout << myVector[i] << '\n';
    // }
    // auto startMergeSecond = chrono::system_clock::now();
    // // vector<pair<int,int>> temp = mySolution.mergeSort(myVector, 0, myVector.size() - 1);
    // vector<int> temp = mySolution.mergeSortSingle(myVector, 0, myVector.size() - 1);
    // auto endMergeSecond = chrono::system_clock::now();
    // auto differenceMerge = (endMergeSecond - startMergeSecond).count();
    // cout << "Merge took " << differenceMerge << '\n';

    vector<int> firstCopy = vector(myVector);
    vector<int> secondCopy = vector(myVector);
    // auto startBuiltIn = chrono::system_clock::now();
    // sort(firstCopy.begin(), firstCopy.end());
    // auto endBuiltIn = chrono::system_clock::now();
    // cout << "Built took " << (endBuiltIn - startBuiltIn).count() << '\n';
    // for (int i = 0; i < temp.size(); i++) {
    //     pair<int, int> element = temp[i];
    //     cout << element.first << ',' << element.second << '\n';
    // }

    auto startInsertion = chrono::system_clock::now();
    mySolution.insertionSort(secondCopy, secondCopy.size());
    auto endInsertion = chrono::system_clock::now();
    cout << "Inser took " << (endInsertion - startInsertion).count() << '\n';
    


    auto startMerge = chrono::system_clock::now();
    // vector<pair<int,int>> temp = mySolution.mergeSort(myVector, 0, myVector.size() - 1);
    // vector<int> temp = mySolution.mergeSortSingle(myVector, 0, myVector.size() - 1);
    auto temp2 = mySolution.mergeSortSingle(myVector, 0, myVector.size() - 1);
    auto endMerge = chrono::system_clock::now();
    
    cout << "Merge took " << (endMerge - startMerge).count() << '\n';



    // for (int i = 0; i < temp.size(); i++) {
    //     cout << temp[i] << '\n';
    // }
    // myVector = vector(1, 10000);

    // myResult = mySolution.twoSum(myVector, myTarget);
    // cout << myResult[0] << '\n' << myResult[1] << '\n';
    // cout << '\n';
    // myVector = vector{11,15, 2, 7};
    // myTarget = 9;
    // myResult = mySolution.twoSum(myVector, myTarget);
    // cout << myResult[0] << '\n' << myResult[1] << '\n';
    // cout << '\n';
    
    // // vector<pair<int,int>> enumeratedVector;
    // // enumeratedVector = mySolution.mergeSort(myVector, 0, myVector.size() - 1);
    // // for (int i = 0; i < enumeratedVector.size(); i++) {
    // //     pair<int,int> element = enumeratedVector[i];
    // //     cout << element.first << ',' << element.second << '\n';
    // // }
    // // cout << '\n';

    // myVector = vector{3,3};
    // myTarget = 6;
    // myResult = mySolution.twoSum(myVector, myTarget);
    // cout << myResult[0] << '\n' << myResult[1] << '\n';
    // cout << '\n';
    return 0;
}

/*
Data range/assumptions:
At least 2
Always a solution
Long length
Large values
Efficiency needed
*/

/*
Important test cases:
2 elements
Large num elements (for efficiency), with worst case (second last and last)
Large values that overflow?
    10^9 * 2 > 10^10        10000000000         -> ~2^34
*/

/*
Plain language solutions:

Naive:
    n^2 iteration through all nums

Better:
    Sort with an n * log(n) sorting algorithm
    Binary search for single matching value
        n times at log(n)
    2nlog(n) in total
    But then need to find the original locations of the element and its complement
    Linear searches 2 * n/2 (avg) = n
    Still under the complexity of the sort
    But non-trivial, would like to remove

Remove search in unsorted list:
    Another vector with the original index of each location in the sorted vector?
    Sort into a vector (value, originalIndex)
*/