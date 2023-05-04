import myAssert from '../march2023/Trie';

function predictPartyVictory(senate: string): string {
    let radiantCode:string = "R";
    let radiantFullName:string = "Radiant";
    let direFullName:string = "Dire";

    if (senate.length === 1) {
        if (senate === radiantCode)  return radiantFullName;
        else  return direFullName;
    }

    let radiantTotal:number = 0;
    let direTotal:number = 0;
    let allowedIndices:Set<number> = new Set();

    for (let i = 0; i < senate.length; i++) { 
        allowedIndices.add(i);
        if (senate[i] === radiantCode)  radiantTotal++;
        else  direTotal++;
    }

    let banNext:number = 0;
    while (allowedIndices.size > 1) {
        if (direTotal <= 0)  return radiantFullName;
        if (radiantTotal <= 0) return direFullName;

        for (const i of allowedIndices) {
            let currentSenator:string = senate[i];
            if (currentSenator === radiantCode) {
                if (banNext < 0) {
                    radiantTotal--;
                    if (radiantTotal <= 0)  return direFullName;
                    allowedIndices.delete(i);
                }
                banNext++;
            } else {
                if (banNext > 0) {
                    direTotal--;
                    if (direTotal <= 0)  return radiantFullName;
                    allowedIndices.delete(i);
                } 
                banNext--;
            }
        }
    }

    if (senate === radiantCode)  return radiantFullName;
    else  return direFullName;
};

function mainPredictPartyVictory():void {
    let senate:string;
    let result:string;
    let doQuitIfAssertFails:boolean = true;

    senate = "DRDRR";
    result = predictPartyVictory(senate);
    console.log(`Final result ${result}`);
    myAssert(result === "Dire", doQuitIfAssertFails);

    senate = "D";
    result = predictPartyVictory(senate);
    console.log(`Final result ${result}`);
    myAssert(result === "Dire", doQuitIfAssertFails);

    senate = "DDRRR";
    result = predictPartyVictory(senate);
    console.log(`Final result ${result}`);
    myAssert(result === "Dire", doQuitIfAssertFails);

    senate = "RDRDDDRDDRDRDDRRRRRD";
    result = predictPartyVictory(senate);
    console.log(`Final result ${result}`);
    myAssert(result === "Dire", doQuitIfAssertFails);

    senate = "RD";
    result = predictPartyVictory(senate);
    console.log(`Final result ${result}`);
    myAssert(result === "Radiant", doQuitIfAssertFails);

    senate = "RDD";
    result = predictPartyVictory(senate);
    console.log(`Final result ${result}`);
    myAssert(result === "Dire", doQuitIfAssertFails);
}

mainPredictPartyVictory();

/*
Data range/assumptions:
sentate length n: [1, 10^4]
values either 'R' or 'D'
*/

/*
Tests:
n = 1
n = max
first senator party doesn't win
*/

/*
Ideas:

Naive:
    Calculate current majority
    For senator in senator
        If favors party of current senator, announce winner
        Otherwise ban

Problem seems weird
    First party always wins if equal senators
        Maybe even if more of the other party

Sample trace RDRDRD
    Ban: RRDRD
    Announce: Radiant

Sample trace RRRDDDDD
    Ban: RRRDDDD
    Ban: RRRDDD
    Ban: RRRDD
    Ban: RRDD
    Ban: RDD
    Ban: RD
    Ban: D
    Announce

So first move advantage, but if other team can survive then they get first mover advantage

Maybe count running sum of both
*/

/*
Completion time (minutes): 49
Question difficulty: Medium
How did it go (0 - 6): 3
    Had some good ideas
    But some tough debugging
    And ended up chasing test cases a lot
*/