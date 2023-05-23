class KthLargest {
    kBiggest:number[];
    maxItems:number;

    constructor(k: number, nums: number[]) {
        this.kBiggest = [];
        this.maxItems = k;
        nums.sort((a, b) => {
            if (a > b) return 1
            else if (a < b) return -1
            else return 0;
        })
        for (const element of nums) {
            this.add(element);
        }
    }

    add(val: number): number {
        let i:number;
        if (this.kBiggest.length === 0)  {
            this.kBiggest.push(val);
        } else {
            for (i = 0; i < this.kBiggest.length; i++) {
                if (val >= this.kBiggest[i])  {
                    this.kBiggest.splice(i, 0, val);
                    break;
                }
            }
            if (this.kBiggest.length < this.maxItems && val < this.kBiggest[0])  this.kBiggest.splice(this.kBiggest.length, 0, val)

            if (this.kBiggest.length > this.maxItems) {
                this.kBiggest.splice(this.kBiggest.length - 1, 1);
            }
        }

        console.log(this.kBiggest)
        return this.kBiggest[this.maxItems - 1];
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

function mainKthLargest():void {
    let k:number;
    let nums:number[];
    let largestCollector:KthLargest;

    k = 3;
    nums = [4, 5, 8, 2];
    largestCollector = new KthLargest(k, nums);
    console.log(largestCollector.add(3));   // return 4
    console.log(largestCollector.add(5));   // return 5
    console.log(largestCollector.add(10));  // return 5
    console.log(largestCollector.add(9));   // return 8
    console.log(largestCollector.add(4));   // return 8

    k = 2;
    nums = [0]
    largestCollector = new KthLargest(k, nums);
    console.log(largestCollector.add(-1));   // return 4
    console.log(largestCollector.add(1));   // return 5
    console.log(largestCollector.add(-2));  // return 5
    console.log(largestCollector.add(-4));   // return 8
    console.log(largestCollector.add(3));   // return 8
}

mainKthLargest();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Maintain a sorted list of k biggest items
    Insert into list using binary search

Better: heap
    Min heap, keeping k items
    And a count
    When get a new item, if larger than min, pop min and insert new and shift
*/

/*
Completion time (minutes): 54
Question difficulty: Easy
How did it go (1 - 6): 1
    Struggled
    Awkward question, with a poor description
    More like a medium
    But I was also tired today
*/