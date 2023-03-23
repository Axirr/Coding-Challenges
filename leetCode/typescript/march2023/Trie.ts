class GraphNode {
    val:string;
    children:Map<string, GraphNode>;
    isWordEnd:boolean;

    constructor(val:string, isWordEnd:boolean = false) {
        if (val.length > 1)  throw new Error("value can only be a single letter");
        
        this.val = val;
        this.children = new Map<string, GraphNode>();
        this.isWordEnd = isWordEnd;
    }

    prettyPrint():void {
        let queue:Array<GraphNode | null> = [this];
        let nextqueue:Array<GraphNode | null> = [];
        let depthLevel:number = 0;

        while (true) {
            console.log(`Depth level ${depthLevel}`);

            while (queue.length > 0) {
                let currentNode:GraphNode | null = queue[0];
                queue.splice(0, 1);
                if (currentNode !== null) {
                    console.log(`val ${currentNode.val}  isWordEnd ${currentNode.isWordEnd}`);
                    for (const child of currentNode.children)  nextqueue.push(currentNode.children.get(child[0])!)
                } else {
                    console.log("level of nulls");
                    nextqueue.push(null);
                }
            }
            console.log()
            depthLevel+=1;
            let hasNonNull:boolean = false;
            for (let index = 0; index < nextqueue.length; index++) {
                const element = nextqueue[index];
                if (element !== null) {
                    hasNonNull = true;
                    break;
                }
            }
            if (!hasNonNull)  break;
            queue = nextqueue;
            nextqueue = [];
        }
    } 
}

class Trie {
    root:GraphNode;

    constructor() {
        this.root = new GraphNode("");
    }

    insert(word: string): void {
        let i:number;
        let currentNode:GraphNode = this.root;
        for (i = 0; i < word.length; i++) {
            if (!currentNode.children.has(word[i]))  break
            else {
                currentNode = currentNode.children.get(word[i])!;
            }
        }

        // Found node for every letter
        if (i === word.length) {
            currentNode.isWordEnd = true;
            return;
        } 

        // Node not found for ith letter
        for (i; i < word.length; i++) {
            let newNode:GraphNode = new GraphNode(word[i]);
            currentNode.children.set(word[i], newNode);
            currentNode = newNode;
        }

        currentNode.isWordEnd = true;
        return;
    }

    search(word: string): boolean {
        return this.sharedSearch(word, true);
    }

    startsWith(prefix: string): boolean {
        return this.sharedSearch(prefix, false);
    }

    sharedSearch(word:string, needsFinal:boolean): boolean {
        let currentNode:GraphNode = this.root;
        let i:number;
        for (i = 0; i < word.length; i++) {
            if (!currentNode.children.has(word[i]))  return false;
            else currentNode = currentNode.children.get(word[i])!;
        }
        if (needsFinal)  return currentNode.isWordEnd;
        return true;
    }

    prettyPrint() {
        this.root.prettyPrint();
    }
}

function mainTrie():void {
    let myTrie:Trie;
    let isFound:boolean;
    let wordToInsert:string;

    myTrie = new Trie();
    myTrie.insert("hello");
    myTrie.insert("worlds");
    // myTrie.prettyPrint();
    isFound = myTrie.search("hello");
    myAssert(isFound);

    isFound = myTrie.search("worlds");
    myAssert(isFound);

    isFound = myTrie.search("world");
    myAssert(!isFound);

    isFound = myTrie.startsWith("world");
    myAssert(isFound);

    wordToInsert = "";
    isFound = myTrie.search(wordToInsert);
    myAssert(!isFound);
    myTrie.insert(wordToInsert);
    isFound = myTrie.search(wordToInsert);
    myAssert(isFound);
}

function myAssert(isTrue:boolean, doQuitOnAssertFail:boolean = false) {
    if (!isTrue) {
        console.log("ASSERTION FAILED")
        if (doQuitOnAssertFail)  throw new Error("assertion fail");
    } else {
        console.log("Passed")
    }
    console.log()
}

// Disable to allow export
// mainTrie();

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/*
Data range/assumptions:
word and prefix length n: [1, 2000]
lowercase letters

*/

/*
Tests:
n = 1
n = 2000
many prefix matches
no prefix matches
some words are substrings of others
insert same word twice
empty string
*/

/*
Ideas:

Naive:
General structure:
    Node that supprts multiple children
        Multiple children implemented through a hash structure
    Store the whole word at the bottom?
        This is probably unnecessary, could reconstruct word from the path
Insert:
    Letter by letter, insert a letter node if it doesn't exist or traverse to existing one
Search:
    Traverse letter by letter until either:
        Run out of letters
            Check if current node isFinal
        Reach end
            If still have letters, then word not in trie
Starts With:
    Exactly like search but we don't check isFinal?
        If run out of letters, return true

Need to differentiate between final locations and non-final locations
    E.g. if word 'tennant' is in trie, doesn't mean word 'ten' is
        But may be
    Boolean flag, isFinal
*/

/*
Completion time (minutes): 43
How did it go? Well
Describe:
    Ideas were clear
    Implemented well on first go through
    No major bugs
*/

export default myAssert;