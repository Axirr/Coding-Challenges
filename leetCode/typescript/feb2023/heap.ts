class MinHeap {
    heapArray:number[];
    constructor(array:number[] = []) {
        this.heapArray = [];
        for (const num of array) { 
            this.insertVal(num); 
        }
    }

    popMin():number {
        if (this.heapArray.length === 0)  throw new Error("Can't pop from empty heap")

        let resultNum = this.heapArray[0];
        let endValue = this.heapArray[this.heapArray.length - 1];
        this.heapArray.pop()
        this.heapArray[0] = endValue;
        this.siftDown(0);

        return resultNum;
    }

    insertVal(val:number):void {
        this.heapArray.push(val);
        let index = this.heapArray.length - 1;
        this.siftUp(index);
    }

    siftDown(index:number) {
        let firstPotentialChildIndex = index * 2;
        let secondPotentialChildIndex = index * 2 + 1;
        let indexToSwap;
        if (firstPotentialChildIndex > this.heapArray.length) return;
        if ((firstPotentialChildIndex < this.heapArray.length && this.heapArray[index] > this.heapArray[firstPotentialChildIndex]) || 
            (secondPotentialChildIndex < this.heapArray.length && this.heapArray[index] > this.heapArray[secondPotentialChildIndex])) {
            indexToSwap = firstPotentialChildIndex;
            if (secondPotentialChildIndex < this.heapArray.length && this.heapArray[secondPotentialChildIndex] < this.heapArray[firstPotentialChildIndex])  indexToSwap = secondPotentialChildIndex;
            let temp:number = this.heapArray[indexToSwap];
            this.heapArray[indexToSwap] = this.heapArray[index];
            this.heapArray[index] = temp;
            this.siftDown(indexToSwap);
        }
    }

    siftUp(index:number):void {
        let parentIndex = index / 2;
        if (index % 2 !== 0)  parentIndex = (index - 1) / 2;

        if (index !== 0 && this.heapArray[index] < this.heapArray[parentIndex]) {
            index = index;
            let temp:number = this.heapArray[parentIndex];
            this.heapArray[parentIndex] = this.heapArray[index];
            this.heapArray[index] = temp;
            this.siftUp(parentIndex);
        }
    }
}

function sortArray(nums:number[]): number[] {
    if (nums.length === 1)  return nums;

    let myHeap = new MinHeap(nums);
    let resultArray:number[] = [];
    let i:number = 0;
    let numsLength:number = nums.length;
    while (i < numsLength) {
        resultArray.push(myHeap.popMin());
        i += 1;
    }

    return resultArray;
}

function mainTests():void {
    let myArray:number[];
    let myHeap:MinHeap;

    myHeap = new MinHeap();
    myHeap.insertVal(1);
    myHeap.insertVal(2);
    console.log(myHeap);

    myHeap = new MinHeap();
    myHeap.insertVal(2);
    myHeap.insertVal(1);
    console.log(myHeap);

    myHeap = new MinHeap();
    myHeap.insertVal(6);
    myHeap.insertVal(5);
    myHeap.insertVal(4);
    myHeap.insertVal(3);
    myHeap.insertVal(2);
    myHeap.insertVal(1);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 1);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 2);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 3);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 4);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 5);
    console.log(myHeap);

    myHeap = new MinHeap([-10, 4, 100, 2, 5, 9, 14]);
    console.assert(myHeap.popMin() === -10);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 2);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 4);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 5);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 9);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 14);
    console.log(myHeap);
    console.assert(myHeap.popMin() === 100);
    console.log(myHeap);
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

// mainTests();

// Heap property: the kth element is smaller than the [2k] and [2k+1] elements

/*
Inserting:
    Insert at end of array
    If not smaller than parent, swap
    Check heap condition for both elements again and swap until all satisfied
*/