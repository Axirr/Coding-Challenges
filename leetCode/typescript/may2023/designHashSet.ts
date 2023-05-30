class MyHashSet {
    myMap:Set<number>;

    constructor() {
        this.myMap = new Set();
    }

    add(key: number): void {
        this.myMap.add(key);
    }

    remove(key: number): void {
        this.myMap.delete(key);
    }

    contains(key: number): boolean {
        return this.myMap.has(key);
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
}

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
*/

/*
Completion time (minutes): 4
Question difficulty: Easy
How did it go (1 - 6): 6
    But solution was kind of a cheat
        Just used a set
*/