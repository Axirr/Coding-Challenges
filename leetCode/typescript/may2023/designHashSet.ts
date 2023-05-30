class MyHashSet {
    myArray:Array<number | null>;

    constructor() {
        this.myArray = Array(64).fill(null);
    }

    add(key: number): void {
        let hashKey = this.hashFunction(key);
        if (hashKey > this.myArray.length) {
            let newLength:number = this.myArray.length;
            while (newLength < hashKey) {
                newLength*=2;
            }
            newLength = Math.min(newLength, 10**6);
            let newArray = Array(newLength).fill(null);
            for (let index = 0; index < this.myArray.length; index++) {
                newArray[index] = this.myArray[index];
            }
            this.myArray = newArray;
        }
        this.myArray[this.hashFunction(key)] = key;
    }

    remove(key: number): void {
        let hashKey:number = this.hashFunction(key);
        if (hashKey >= this.myArray.length)  return;
        this.myArray[this.hashFunction(key)] = null;
    }

    contains(key: number): boolean {
        let hashKey:number = this.hashFunction(key);
        if (hashKey >= this.myArray.length)  return false;
        return this.myArray[this.hashFunction(key)] !== null;
    }

    hashFunction(key:number): number {
        return key;
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