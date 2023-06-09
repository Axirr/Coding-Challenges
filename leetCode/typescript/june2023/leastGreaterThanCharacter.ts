import myAssert from "../march2023/Trie";

function nextGreatestLetter(letters: string[], target: string): string {
    let leastGreater:string = letters[0];

    for (const letter of letters) {
        if (letter > target) {
            if (leastGreater <= target)  leastGreater = letter;
            else if (letter < leastGreater)  leastGreater = letter;
        }
    }

    return leastGreater;
};

function mainNextGreatestLetter():void {
    let letters:string[];
    let target:string;
    let result:string;
    let doQuitIfAssertFails:boolean = true;

    letters = ["c","f","j"]
    target = "a";
    result = nextGreatestLetter(letters, target);
    console.log(`final result ${result}`);
    myAssert(result === "c", doQuitIfAssertFails);

    letters = ["c","f","j"], target = "c";
    target = "c";
    result = nextGreatestLetter(letters, target);
    console.log(`final result ${result}`);
    myAssert(result === "f", doQuitIfAssertFails);

    letters = ["x","x","y","y"], target = "z";
    target = "z";
    result = nextGreatestLetter(letters, target);
    console.log(`final result ${result}`);
    myAssert(result === "x", doQuitIfAssertFails);
}

mainNextGreatestLetter();

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
Completion time (minutes): 7
Question difficulty: Easy
How did it go (1 - 6): 5
    Minor bug
*/