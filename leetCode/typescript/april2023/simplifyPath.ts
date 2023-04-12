import myAssert from "../march2023/Trie";

function simplifyPath(path: string): string {
    let newPath:string = path;
    let singlePeriodRegExp = /\/\.\//
    newPath = newPath.replace(singlePeriodRegExp, "//")
    console.log(newPath)

    let multislashRegExp = /\/{2,}/g
    newPath = newPath.replace(multislashRegExp, "/");

    let splitPath:string[] = newPath.split("/")
    let pathStack:string[] = []
    for (const directory of splitPath) {
        if (directory == "..") {
            pathStack.pop();
        } else if (directory !== ".") {pathStack.push(directory);}
    }

    newPath = "/" + pathStack.join("/");

    // Multi-slash turned into single slash
    newPath = newPath.replace(multislashRegExp, "/");

    // Trailing slash
    if (newPath.length > 1) {
        if (newPath[newPath.length - 1] === "/")  newPath = newPath.slice(0, newPath.length - 1);
    }
    return newPath;
};

function mainSimplifyPath():void {
    let path:string;
    let simplifiedPath:string;
    let doQuitIfAssertFails:boolean = false;

    path = "/...";
    simplifiedPath = simplifyPath(path);
    console.log(`Final simplified path ${simplifiedPath}`);
    myAssert(simplifiedPath === "/...", doQuitIfAssertFails);

    path = "/a//b////c/d//././/..";
    simplifiedPath = simplifyPath(path);
    console.log(`Final simplified path ${simplifiedPath}`);
    myAssert(simplifiedPath === "/a/b/c", doQuitIfAssertFails);

    path = "/a/../../b/../c//.//";
    simplifiedPath = simplifyPath(path);
    console.log(`Final simplified path ${simplifiedPath}`);
    myAssert(simplifiedPath === "/c", doQuitIfAssertFails);

    path = "/home//foo/";
    simplifiedPath = simplifyPath(path);
    console.log(`Final simplified path ${simplifiedPath}`);
    myAssert(simplifiedPath === "/home/foo", doQuitIfAssertFails);

    path = "/home/";
    simplifiedPath = simplifyPath(path);
    console.log(`Final simplified path ${simplifiedPath}`);
    myAssert(simplifiedPath === "/home", doQuitIfAssertFails);

    path = "/../";
    simplifiedPath = simplifyPath(path);
    console.log(`Final simplified path ${simplifiedPath}`);
    myAssert(simplifiedPath === "/", doQuitIfAssertFails);

    path = "/a/./b/../../c/";
    simplifiedPath = simplifyPath(path);
    console.log(`Final simplified path ${simplifiedPath}`);
    myAssert(simplifiedPath === "/c", doQuitIfAssertFails);

}

mainSimplifyPath();

/*
Data range/assumptions:
*/

/*
Tests:
Trailing slash is only thing, do we remove?
*/

/*
Ideas:

Naive:
*/

/*
Completion time (minutes): 90
Question difficulty: medium
How did it go (0 - 6): 1
    Got stuck on Javascript Reg Exp escaping
    And didn't understand the question
        Which was, admittedly, poorly explained
*/