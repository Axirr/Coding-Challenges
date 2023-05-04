import myAssert from '../march2023/Trie';

function predictPartyVictory(senate: string): string {
    let radiantCode:string = "R";
    let radiantTotal:number = 0;
    let direTotal:number = 0;

    for (const char of senate) {
        if (char === radiantCode)  radiantTotal++;
        else  direTotal++;
    }

    let bannedIndices:Set<number> = new Set();
    let banNext:number = 0;


    while (true) {
        if (radiantTotal <= 0)  return "Dire";
        if (direTotal <= 0)  return "Radiant";

        for (let i:number =0; i < senate.length; i++) {
            if (bannedIndices.has(i))  {
                continue;
            }

            let currentSenator:string = senate[i];
            if (currentSenator === radiantCode) {
                if (banNext < 0) {
                    radiantTotal--;
                    if (radiantTotal <= 0)  return "Dire";
                    bannedIndices.add(i);
                }
                banNext++;
            } else {
                if (banNext > 0) {
                    direTotal--;
                    if (direTotal <= 0)  return "Radiant";
                    bannedIndices.add(i);
                } 
                banNext--;
            }
        }
    }
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