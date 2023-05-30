class ParkingSystem {
    big:number;
    medium:number;
    small:number;

    constructor(big: number, medium: number, small: number) {
        this.big = big;
        this.medium = medium;
        this.small = small;
    }

    addCar(carType: number): boolean {
        let didFind:boolean = false;
        if (carType === 1 && this.big > 0) {
            this.big--;
            didFind = true;
        } else if (carType === 2 && this.medium > 0) {
            this.medium--;
            didFind = true;
        } else if (carType === 3 && this.small > 0) {
            this.small--;
            didFind = true;
        }

        return didFind;
    }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */

function mainParkingSystem(): void {
    let big:number;
    let medium:number;
    let small:number;

    let myParkSys:ParkingSystem;

    big = 1;
    medium = 1;
    small = 0;
    myParkSys = new ParkingSystem(big, medium, small);
}

mainParkingSystem();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
*/

/*
Completion time (minutes): 5
Question difficulty: Easy
How did it go (1 - 6): 6
    Easy question
    No bugs
*/