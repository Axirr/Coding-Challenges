function compress(chars: string[]): number {
    if (chars.length === 0)  return 1;

    let writeIndex:number = 0;
    let currentCount:number = 1;
    let currentLetter:string = chars[0];

    for (let i = 1; i < chars.length; i++) {
        if (chars[i] === currentLetter)  {
            currentCount += 1;
        } else {
            writeIndex = writeNumber(currentLetter, currentCount, chars, writeIndex);
            currentLetter = chars[i];
            currentCount = 1;
        }
    }
    writeIndex = writeNumber(currentLetter, currentCount, chars, writeIndex);
    return writeIndex;
};

function writeNumber(currentLetter:string, currentCount:number, chars:string[], writeIndex:number):number {
    chars[writeIndex] = currentLetter;
    writeIndex += 1;
    if (currentCount > 1) {
        let digits = digitsForNumber(currentCount);
        for (const digitString of digits) {
            chars[writeIndex] = digitString;
            writeIndex += 1;
        }
    }
    return writeIndex;
}

function digitsForNumber(num:number):string[] {
    let digitArray:string[] = [];
    while (num > 0) {
        let newDigit:number = num % 10;
        digitArray.push(newDigit.toString());
        num = Math.floor(num /= 10);
    }

    digitArray.reverse();
    return digitArray;
}

function mainCompress():void {
    let chars:string[];
    let newLength:number;

    chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"];
    newLength = compress(chars);
    console.log(chars);
    console.assert(newLength === 4);

    chars = ["a","a","b","b","c","c","c"];
    newLength = compress(chars);
    console.log(chars);
    console.assert(newLength === 6);

    chars = ["a"]
    newLength = compress(chars);
    console.log(chars);
    console.assert(newLength === 1);

    chars = ["a","a","a","a","a","a","a","a","a","a"]
    newLength = compress(chars);
    console.log(chars);
    console.assert(newLength === 3);

}

mainCompress();

/*
Data range/assumptions:
chars length n: [1, 2000]
lowercase English letters
*/

/*
Tests:
n = 1
n = 2000
no compression
lots of compression
all the same letter
digits for number tests
    1 digit
    many digits
    exactly on a power of 10 digits
*/

/*
Ideas:

Naive:
    Pointer to write spot
    Traverse string:
        Counting duplicates
        Write to write spot
            Plus number if group larger than 2
Will write spot ever go past read spots?
    Don't think so, since worse case compression is 1:1 (for groups size 1 and 2)

Digit calculation:
    Determine divisor
    Then floor divide by divisor
    Then mod 10
    E.g. 999
    Divisor = 100
    9
*/

/*
Did it go well?
If not, why?
*/