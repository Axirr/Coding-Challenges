class TreeNode {
    #val;
    #left;
    #right;

    constructor(value, left=null, right=null) {
        this.#val = value;
        this.#left = left;
        this.#right = right;
    }

    get val() {
        return this.#val;
    }
    get left() {
        return this.#left;
    }

    get right() {
        return this.#right;
    }

    set val(value) {
        this.#val = value;
    }
    set left(left) {
        this.#left = left;
    }

    set right(right) {
        this.#right = right;
    }
}

var maxDepth = function(root) {
    let stepCount = 0;
    let frontier = [];
    if (root !== null) { frontier.push(root); }
    let nextFrontier = [];
    while (frontier.length > 0) {
        stepCount += 1;
        for (var node of frontier) {
            if (node.left !== null) { nextFrontier.push(node.left); }
            if (node.right !== null) { nextFrontier.push(node.right); }
        }
        frontier = nextFrontier;
        nextFrontier = [];
    }
    return stepCount;
};

function main() {
    let binaryTree = new TreeNode(8);
    let depth = maxDepth(binaryTree);
    console.log(depth);
    console.assert(depth === 1);
}

main();

/*
Ideas:

Naive: step wise breadth first search
*/