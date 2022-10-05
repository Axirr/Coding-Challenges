#include <iostream>
#include <cstdlib>
#include <ctime>

class Solution {
public:
    TreeNode* addOneRow(TreeNode* root, int val, int depth) {
        if (depth == 1) {
            TreeNode* newRoot = new TreeNode(val);
            newRoot->left = root;
            return newRoot;
        }

        helperAddOneRow(root, val, depth, 1);
        return root;
    }

    void helperAddOneRow(TreeNode* root, int val, int depth, int currentDepth) {
        if (currentDepth == (depth - 1)) {
            TreeNode* newLeft = new TreeNode(val, root->left, nullptr);
            TreeNode* newRight = new TreeNode(val, nullptr, root->right);
            root->left = newLeft;
            root->right = newRight;
        } else if (currentDepth < (depth - 1)) {
            if (root->left) {
                helperAddOneRow(root->left, val, depth, currentDepth + 1);
            }
            if (root->right) {
                helperAddOneRow(root->right, val, depth, currentDepth + 1);
            }
        }
    }
};

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

void printTree(TreeNode* root, int indent) {
    for (int i = 0; i < indent; i++) {
        std::cout << "    ";
    }

    if (root == nullptr) {
        std::cout << "null\n";
    } else {
        std::cout << root->val << '\n';
        printTree(root->left, indent + 1);
        printTree(root->right, indent + 1);
    }

}

int main() {
    Solution mySol = Solution();
    TreeNode* myTree = new TreeNode(3);
    TreeNode* myLeft = new TreeNode(2);
    TreeNode* myRight = new TreeNode(4);
    TreeNode* current = myTree;
    int layerNumber = 3;
    srand(std::time(nullptr));
    for (int i = 0; i < layerNumber; i++) {
        current->left = myLeft;
        current->right = myRight;
        if ((rand() % 2 == 1)) {
            current = myLeft;
        } else {
            current = myRight;
        }
        myLeft = new TreeNode(rand() % 10);
        myRight = new TreeNode(rand() % 10);
    }
    printTree(myTree, 0);
    myTree = mySol.addOneRow(myTree, -1, layerNumber + 1);
    std::cout << '\n';
    std::cout << '\n';
    std::cout << "SECOND TREE: \n";
    printTree(myTree, 0);
}

/*
Data range/assumptions:
Non-empty
Large tree
Depth always exists in the tree
*/

/*
Important test cases:
Depth = 1
    New val is root, whole tree is below, to the left
Large tree, for efficiency
Depth = bottom/leaves
    Leaves stay the same, new depth above
Depth > 2
    Will need more than two nodes?
*/

/*
Naive:
    For each node at depth + 1 level create a left right
    Then hook old left to new left and old right to new right
    Time efficiency doesn't seem to be an issue
        Only need to deal with 2k, where k = nodes at depth + 1
            Create 2k new nodes
            Hook up left and right to these nodes
            2, since 
    
    Sanity check:
        Efficiency: O(n)
        Works:
            Trees below stay the same, since merely receive new parent
            New node values are simple
            Easy to hook up left and right
                If left node, hook old.left
                If right node, hook old.right

Tree traversal, maintaining depth:
    Depth first:
        if (currentDepth = depth - 1) {
            pass
        } else if (currentDepth < depth - 1) {
            currentDepth += 1
            if (left):
                traverse(left, curDep)
            if (right):
                traverse(right, curDep)
        }
*/