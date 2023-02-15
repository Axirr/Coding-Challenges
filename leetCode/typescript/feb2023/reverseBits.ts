function reverseBits(n: number): number {
    let myArray:number[] = [];
    let mask:number = 0b10000000000000000000000000000000;
    let i = 31;
    let temp:number;
    while (i >= 0) {
        temp = (n & mask) >>> i;
        myArray.push(temp);

        i -= 1;
        mask = mask >>> 1;
        console.log((mask >>> 0).toString(2))
    }
    console.log(myArray)
    myArray.reverse()

    let multiplier:number = Math.pow(2, 31);
    let resultNum = 0;
    for (let i=0; i < 32; i++) {
        resultNum += myArray[i] * multiplier;
        multiplier = Math.floor(multiplier / 2);
    }
    return resultNum;
    // let total:number = 0b0;
    // let mask:number = 0b10000000000000000000000000000000;
    // // let mask:number = Math.pow(2, 32) - 1;
    // let shiftValue:number = 31;
    // while (shiftValue >= 0) {
    //     let temp:number;
    //     if (shiftValue > 0) {
    //         temp = n & mask >>> Math.floor(shiftValue);
    //     } else temp = n & mask << Math.abs(shiftValue - 16);

    //     console.log((temp >>> 0).toString(2))
    //     total += temp

    //     shiftValue -= 1;
    //     mask >>> 1;
    // }
    // return total;
};

function mainReverseBits(): void {
    let n:number;
    let shiftedN:number;

    n = 0b00000010100101000001111010011100;
    // n = 0b11111111111111111111111111111111;
    shiftedN = reverseBits(n);
    console.log((shiftedN >>> 0).toString(2));
    let correct:number = 0b00111001011110000010100101000000;
    console.log((correct >>> 0).toString(2))
    console.assert(shiftedN === correct)
}

mainReverseBits()