#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> numsCopy = vector(nums);
        sort(numsCopy.begin(), numsCopy.end());

        int element;
        vector<int> resultVector;
        int i;
        int searchIndex;
        for (i = 0; i < numsCopy.size(); i++) {
            element = numsCopy[i];
            // Check not needed, since solution guaranteed
            // if (element > target) {  break;  }
            searchIndex = binarySearch(numsCopy, target - element);
            if (searchIndex != -1) {
                // resultVector.push_back(i);
                // resultVector.push_back(searchIndex);
                break;
            }
        }
        vector<int>::iterator searchIterator = find(nums.begin(), nums.end(), element);
        resultVector.push_back(distance(nums.begin(), searchIterator));
        if (element != (target - element)) {
            searchIterator = find(nums.begin(), nums.end(), target - element);
            resultVector.push_back(distance(nums.begin(), searchIterator));
        } else {
            searchIterator = find(searchIterator+1, nums.end(), target - element);
            resultVector.push_back(distance(nums.begin(), searchIterator));
        }
        // cout << "test\n";
        return resultVector;
    }

    int binarySearch(vector<int>& myVector, int myValue) {
        int resultInt = -1;
        int low = 0;
        int high = myVector.size() - 1;
        int mid;
        while (high >= low) {
            mid = (high + low) / 2;
            if (myVector[mid] == myValue) {
                resultInt = mid;
                break;
            } else if (myVector[mid] < myValue) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return resultInt;
    }

};

int main() {
    Solution mySolution = Solution();
    vector<int> myVector = vector{3,2};
    int myTarget = 5;
    vector<int> myResult;
    myResult = mySolution.twoSum(myVector, myTarget);
    cout << myResult[0] << '\n' << myResult[1] << '\n';
    myVector = vector{11,15, 2, 7};
    myTarget = 9;
    myResult = mySolution.twoSum(myVector, myTarget);
    cout << myResult[0] << '\n' << myResult[1] << '\n';
    myVector = vector{3,3};
    myTarget = 6;
    myResult = mySolution.twoSum(myVector, myTarget);
    cout << myResult[0] << '\n' << myResult[1] << '\n';
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
*/