import myAssert from "../march2023/Trie";

function removeStars(s: string): string {
    let letterStack:string[] = [];
    for (const letter of s) {
        if (letter !== "*")  letterStack.push(letter);
        else letterStack.pop()
    }

    return letterStack.join("");
};

function mainRemoveStars():void {
    let s:string;
    let result:string;
    let doQuitIfAssertFails:boolean = true;

    s = "leet**cod*e";
    result = removeStars(s);
    console.log(`Final result ${result}`);
    myAssert(result === "lecoe", doQuitIfAssertFails);

    s = "erase*****";
    result = removeStars(s);
    console.log(`Final result ${result}`);
    myAssert(result === "", doQuitIfAssertFails);
}

mainRemoveStars();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Have a stack of letters
    Pop when find star
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/