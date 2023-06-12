import myAssert from "../march2023/Trie";

function summaryRanges(nums: number[]): string[] {
    if (nums.length === 0)  return [];
    let firstNum:number = nums[0];
    let previousNum:number = firstNum;
    let result:string[] = [];
    for (let i = 1; i < nums.length; i++) {
        const currentNum:number = nums[i];
        if (currentNum !== previousNum + 1)  {
            addRange(firstNum, previousNum, result);
            firstNum = currentNum;
        }
        previousNum = currentNum;
    }
    addRange(firstNum, previousNum, result);

    return result;
};

function addRange(firstNum:number, previousNum:number, result:string[]):void {
    if (firstNum === previousNum) {
        result.push(firstNum.toString());
    } else {
        result.push(firstNum.toString() + "->" + previousNum.toString());
    }
}

function mainSummaryRanges():void {
    let nums:number[];
    let result:string[];
    let correctResult:string[];
    let doQuitIfAssertFails:boolean = true;

    nums = [0,1,2,4,5,7];
    result = summaryRanges(nums);
    for (const element of result)  console.log(element)
    correctResult = ["0->2","4->5","7"];
    myAssert(result.length === correctResult.length, doQuitIfAssertFails);
    for (let i = 0; i < result.length; i++) {
        let resultString:string = result[i];
        let correctString:string = correctResult[i];
        myAssert(resultString === correctString, doQuitIfAssertFails);
    }

    nums = [0,2,3,4,6,8,9]
    correctResult = ["0","2->4","6","8->9"];
    result = summaryRanges(nums);
    for (const element of result)  console.log(element)
    myAssert(result.length === correctResult.length, doQuitIfAssertFails);
    for (let i = 0; i < result.length; i++) {
        let resultString:string = result[i];
        let correctString:string = correctResult[i];
        myAssert(resultString === correctString, doQuitIfAssertFails);
    }
}

mainSummaryRanges();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    firstLetter, lastLetter
    previousLetter = firstLetter
    for (i) {
        currentLetter
        if (currentNum !== previousLetter + 1)  break
        previousLetter = currentLetter
    }
    .add(firstLetter + "->" + lastLetter)
*/

/*
Completion time (minutes): 19
Question difficulty: Easy
How did it go (1 - 6): 5
    Seemed like a hard easy but went alright
*/