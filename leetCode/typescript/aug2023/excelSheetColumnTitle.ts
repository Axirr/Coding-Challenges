import myAssert from "../march2023/Trie";

function convertToTitle(columnNumber: number): string {
    let title:string = "";

    while (columnNumber > 0) {
        console.log(columnNumber)
        let charCode:number = Math.floor(columnNumber % 26);
        title += String.fromCharCode(charCode + 64);
        columnNumber = Math.floor(columnNumber / 26);
    }

    return title;
};

function mainCovertToTitle(): void {
    let columnNumber:number;
    let result:string;
    let doQuitIfAssertFails:boolean = false;

    columnNumber = 1;
    result = convertToTitle(columnNumber);
    console.log(`result ${result}`)
    myAssert(result === "A", doQuitIfAssertFails);

    columnNumber = 2;
    result = convertToTitle(columnNumber);
    console.log(`result ${result}`)
    myAssert(result === "B", doQuitIfAssertFails);

    columnNumber = 28;
    result = convertToTitle(columnNumber);
    console.log(`result ${result}`)
    myAssert(result === "AB", doQuitIfAssertFails);

    columnNumber = 701;
    result = convertToTitle(columnNumber);
    console.log(`result ${result}`)
    myAssert(result === "ZY", doQuitIfAssertFails);

    // columnNumber = 2147483647;
    // result = convertToTitle(columnNumber);
    // console.log(`result ${result}`)
}

mainCovertToTitle();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Mod number by 26 repeatedly
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/