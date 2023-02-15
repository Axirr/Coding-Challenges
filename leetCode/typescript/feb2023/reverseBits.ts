function reverseBits(n: number): number {
    let total:number = 0;
    let mask:number = 0b10000000000000000000000000000000;
    let shiftValue:number = 31;

    // Right shifts
    while (shiftValue > 0) {
        total = total | ((n & mask) >>> shiftValue); 

        shiftValue -= 2;
        mask = mask >>> 1;
    }

    // Left shifts
    while (shiftValue > -32) {
        total = total | ((n & mask) << Math.abs(shiftValue)); 

        shiftValue -= 2;
        mask = mask >>> 1;
    }

    // Need to do 0 shift or will interpret as signed
    return total >>> 0;
};

function mainReverseBits(): void {
    let n:number;
    let shiftedN:number;

    n = 0b00000010100101000001111010011100;
    shiftedN = reverseBits(n);
    console.log((shiftedN >>> 0).toString(2));
    let correct:number = 0b00111001011110000010100101000000;
    console.log((correct >>> 0).toString(2))
    console.assert(shiftedN === correct)

    n = 0b11111111111111111111111111111101;
    shiftedN = reverseBits(n);
    console.log((shiftedN >>> 0).toString(2));
    correct = 0b10111111111111111111111111111111;
    console.log((correct >>> 0).toString(2))
    console.assert(shiftedN === correct)
}

mainReverseBits()