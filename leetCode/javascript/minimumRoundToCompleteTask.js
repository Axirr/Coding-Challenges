function minimumRounds(tasks) {
    let countMap = new Map();
    for (let i=0; i < tasks.length; i++) {
        let num = tasks[i]
        if (countMap.has(num)) {
            countMap.set(num, countMap.get(num) + 1)
        } else {
            countMap.set(num, 1)
        }
    }


    let opNums = 0;
    for (let pair of countMap) {
        let value = pair[1]
        if (value == 1)  { return -1; }
        else { 
            opNums += Math.floor(value / 3)
            let remainder = value % 3
            if (remainder !== 0) { opNums += 1; }
        }
    }

    return opNums;
}

function myMain() {
    let nums = [2, 2, 3, 3, 2, 4, 4, 4, 4, 4]
    let myMinRounds = minimumRounds(nums);
    console.log(myMinRounds)

    nums = [2, 3, 3]
    myMinRounds = minimumRounds(nums);
    console.log(myMinRounds)
}

myMain() 
/*
Problem;
    Can complete 2 or 3 tasks of same difficulty each round
    Return -1 if not possible, or minimum

    Ideas:
        Count all difficulty
        if any 1, return -1
        count += myCount / 3
        if % is 1, + 2
        else + 1
*/
/*
from typing import List
from collections import Counter

class Solution:
    def minimumRounds(self, tasks: List[int]) -> int:
        counter = Counter()
        for num in tasks:
            counter[num] += 1
        
        opNums = 0
        for key in counter:
            value = counter[key]
            if value == 1:
                return -1
            elif value % 3 == 0:
                opNums += value // 3
            else:
                opNums += value // 3 + 1
        return opNums

def main():
    sol = Solution()
    tasks = [2,2,3,3,2,4,4,4,4,4]
    minOps = sol.minimumRounds(tasks)
    print(minOps)
    assert minOps == 4
    tasks = [2,3,3]
    minOps = sol.minimumRounds(tasks)
    print(minOps)
    assert minOps == -1

main()

'''
Data range/assumptions:
Number of tasks n: [1, 10^5]
Difficulty magnitude: [1, 10^9]
Can complete either 2 or 3 tasks of the same difficulty
Not ordered
'''

'''
Tests:
1 task
10^5 tasks
All same difficulty
Mixed difficulty
Impossible to complete
'''

'''
Ideas:

Naive:
    Count the number of each difficulty
    Mod % 3 =
        0 -> k // 3
        1 -> k // 3 + 1
        2 -> k // 3 + 1
    
    Time complexity:
        counting: n
        summing: n
        2n -> O(n)

What numbers are impossible:
    1
    Anything else can be split into either 2's or 3's? 

What is minimum?
    As many 3 groupings as possible until can't
    E.g. 4 has to be 2 and 2
    I think it's only 4?
'''
*/