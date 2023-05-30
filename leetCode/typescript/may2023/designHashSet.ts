class MyHashSet {
    MAX_HASH_SIZE = 10000;
    myArray:Array<Array<number>>;

    constructor() {
        this.myArray = Array(64).fill([]);
    }

    add(key: number): void {
        if (this.contains(key)) return;

        let hashKey = this.hashFunction(key);
        if (hashKey >= this.myArray.length) {
            let newLength:number = this.myArray.length;
            while (newLength < hashKey) {
                newLength*=2;
            }
            newLength = Math.min(newLength, this.MAX_HASH_SIZE);
            let newArray = Array(newLength).fill([]);
            for (let index = 0; index < this.myArray.length; index++) {
                newArray[index] = this.myArray[index];
            }
            this.myArray = newArray;
        }

        let arrayForKey:Array<number> = this.myArray[hashKey];
        if (arrayForKey.length === 0) {
            arrayForKey.push(key);
            return;
        }

        let insertionIndex:number = this.binarySearch(arrayForKey, key, true);
        arrayForKey.splice(insertionIndex, 0, key);
    }

    remove(key: number): void {
        let hashKey:number = this.hashFunction(key);
        if (hashKey >= this.myArray.length)  return;
        let arrayForKey:number[] = this.myArray[hashKey];
        if (arrayForKey.length === 0)  return;
        let searchIndex:number = this.binarySearch(arrayForKey, key);
        if (searchIndex === -1)  return;
        // Slow (O(n)), would be nice to improve
        //      n should be bounded by collision factor of hash
        arrayForKey.splice(searchIndex, 1);
    }

    contains(key: number): boolean {
        let hashKey:number = this.hashFunction(key);
        if (hashKey >= this.myArray.length)  return false;
        let arrayForKey:number[] = this.myArray[hashKey];
        let searchIndex:number = this.binarySearch(arrayForKey, key);
        return searchIndex !== -1;
    }

    // Not sure if this is actually a good hash function
    hashFunction(key:number): number {
        let firstPrime:number = 1618931;
        let secondPrime:number = 1233527;
        return ((key + firstPrime) % this.MAX_HASH_SIZE + secondPrime) % this.MAX_HASH_SIZE;
    }

    binarySearch(collisionArray:number[], key:number, isInsert:boolean = false):number {
        let low:number = 0;
        let high:number = collisionArray.length - 1;
        let middle = Math.ceil((low + high) / 2);
        while (low <= high) {
            middle = Math.ceil((low + high) / 2);
            if (collisionArray[middle] === key)  return middle;
            else if (collisionArray[middle] > key)  high = middle - 1;
            else low = middle + 1;
        }
        middle = Math.ceil((low + high) / 2);
        if (isInsert)  {
            // console.log(`middle for insertion ${middle}`)
            return middle;
        }
        return -1;
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */

function mainMyHashSet():void {
    let myHashSet:MyHashSet = new MyHashSet();
    myHashSet.add(7);
    console.log(myHashSet.contains(7));
    console.log(myHashSet.contains(81));
    myHashSet.add(81);
    console.log(myHashSet.contains(7));
    console.log(myHashSet.contains(81));
    myHashSet.add(81);

    let currentSize:number = 10000;
    let maxSize:number = 1000000;
    let divisor:number = Math.ceil(maxSize / currentSize);
    let bucketCount:number[] = Array(divisor).fill(0);
    let attempts:number = 10000000;
    for (let i = 0; i < attempts; i++) {
        let randNum:number = Math.floor(Math.random() * (maxSize - 1));
        let hashKey:number = myHashSet.hashFunction(randNum);
        let bucketKey:number = hashKey % divisor;
        bucketCount[bucketKey] = bucketCount[bucketKey] + 1;
    }
    console.log(bucketCount);
}

mainMyHashSet();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Use a set?
        That should count as a built-in library

Hash set:
    Hashing a number
    Needs to be almost random
    Need to accomodate for collision
        I believe some will be necessary
    Should have constant time lookup
    The way it is defined in the problem, seems more like just a set
        Don't re-add duplicates

Proper hash set:
    Hash function enables O(1) lookup because generates index
    Simple version: use key as direct index
        Make a list with 10^6 elements will null in them
*/

/*
Completion time (minutes): 4
Question difficulty: Easy
How did it go (1 - 6): 6
    But solution was kind of a cheat
        Just used a set
*/