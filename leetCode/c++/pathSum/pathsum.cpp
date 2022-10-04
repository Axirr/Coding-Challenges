#include <iostream>
#include <string>

class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (root == nullptr) {  return false;  }

        return runningSumPathSum(root, targetSum, 0);
    }

    bool runningSumPathSum(TreeNode* root, int targetSum, int runningSum) {
        runningSum += root->val;
        bool leftResult = false;
        bool rightResult = false;

        if (root->left) {
            leftResult = runningSumPathSum(root->left, targetSum, runningSum);
        }

        if (root->right) {
            rightResult = runningSumPathSum(root->right, targetSum, runningSum);
        }

        // Base case, check if sum correct
        if (root->left == nullptr && root->right == nullptr) {
            if (runningSum == targetSum) {  return true;  }
        }

        if (leftResult || rightResult) {  return true;  }
        return false;
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

int main() {
    Solution mySolution = Solution();
    TreeNode myTree = TreeNode();
    bool resultBool = mySolution.hasPathSum(&myTree, 7);
    std::string resultString = "true";
    if (false == resultBool) { resultString = "false";  }
    std::cout << resultString << '\n';
    
    return 0;
}

/*
Data range/assumptions:
Can be empty
Values and sums fairly small
Node values can be negative, so can't stop looking as soon as sum > targetSum
*/

/*
Important test cases:
Empty tree
No sum requiring full traversal
Sum correct
Large tree
Largest sum
Largest node values
*/

/*
Naive:
    Depth first search of paths until end reached
    If runningSum == targetSum:     return
    Else continue
    Return false if reach end

Better:
    Since BST is ordered can possibly pick a statistically better branch?
        Very hard to see benefit from this without large and represenative data set
*/
