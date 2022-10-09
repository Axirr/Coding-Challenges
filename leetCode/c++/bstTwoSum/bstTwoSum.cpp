#include <iostream>
#include <cstdlib>

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    bool findTarget(TreeNode* root, int k) {
        // if (root->left == nullptr && root->right == nullptr) {  return false;  }
        return helperFindTarger(root, k, root);
    }

    bool helperFindTarger(TreeNode* current, int k, TreeNode* topRoot) {
        bool leftResult = false;
        bool rightResult = false;
        int complement = k - current->val;
        bool selfResult = false;
        selfResult = binarySearch(topRoot, complement, current);
        if (selfResult) {  return true;  }
        if (current->left) {
            leftResult = helperFindTarger(current->left, k, topRoot);
            if (leftResult) {  return true;  }
        }
        if (current->right) {
            rightResult = helperFindTarger(current->right, k, topRoot);
        }
        return rightResult;
    }

    bool binarySearch(TreeNode* root, int searchValue, TreeNode* current) {
        TreeNode* nextNode = root;
        while (nextNode != nullptr) {
            int currentValue = nextNode->val;
            if (currentValue == searchValue && nextNode != current) {
                return true;
            }
            if (currentValue < searchValue) {
                nextNode = nextNode->right;
            } else {
                nextNode = nextNode->left;
            }
        }
        return false;
    }
};


int main() {
    Solution mySol = Solution();
    TreeNode* myNode = new TreeNode(5);
    TreeNode* myLeft = new TreeNode(3);
    TreeNode* myRight = new TreeNode(7);
    myNode->left = myLeft;
    myNode->right = myRight;
    bool myResult = mySol.findTarget(myNode, 8);
    std::cout << myResult << '\n';
    delete(myNode);
    return 0;
}

/*
Data range/assumptions:
Non-empty tree
Large number of nodes
Nodes have large value
    Can be negative, so can't dismiss "too large"
Child node value equal to parent node
    Which side does this go to
*/

/*
Important test cases:
Single node tree
No solution in tree
Multiple solutions in tree
*/

/*
Ideas:
Naive:
    For each node
        Determine complement to value
        Binary search tree for value
    log(n) search n times n log (n)
*/