function isPalindrome(s: string): boolean {
    let frontIndex:number = 0;
    let backIndex:number = s.length - 1;

    let alphaRegEx:RegExp = new RegExp('[A-Za-z0-9]');

    while (true) {
        while (frontIndex < backIndex) {
            if (s[frontIndex].match(alphaRegEx)) { break; }
            frontIndex += 1;
        }

        while (frontIndex < backIndex) {
            if (s[backIndex].match(alphaRegEx)) { break; }
            backIndex -= 1;
        }

        if (frontIndex >= backIndex) { break; }
        if (s[frontIndex].toLowerCase() !== s[backIndex].toLowerCase()) { return false; }
        frontIndex += 1;
        backIndex -= 1;
    }

    return true;
};

function mainIsPalindrome(): void {
    let s:string;
    let boolIsPal:boolean;

    s = "A man, a plan, a canal: Panama";
    boolIsPal = isPalindrome(s);
    console.log(boolIsPal);
    console.assert(boolIsPal);
}

mainIsPalindrome();