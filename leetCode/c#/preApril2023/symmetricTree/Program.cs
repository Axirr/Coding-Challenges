using System;
using System.Diagnostics;

public class Program {
    static public void Main() {
        Solution sol = new Solution();
        TreeNode myTree = new TreeNode(0, new TreeNode(1), new TreeNode(3));
        bool isSym;

        isSym = sol.IsSymmetric(myTree);
        Console.WriteLine(isSym);
        Debug.Assert(!isSym);

        myTree = new TreeNode(0, new TreeNode(1), new TreeNode(1));
        isSym = sol.IsSymmetric(myTree);
        Console.WriteLine(isSym);
        Debug.Assert(isSym);

        TreeNode leftTree = new TreeNode(1, new TreeNode(2), new TreeNode(3));
        TreeNode rightTree = new TreeNode(1, new TreeNode(2), new TreeNode(3));
        TreeNode secondLeftTree = new TreeNode(7, new TreeNode(7), new TreeNode(7));
        TreeNode thirdLeftTree = new TreeNode(7, new TreeNode(7), new TreeNode(7));
        leftTree.left = secondLeftTree;
        rightTree.left = thirdLeftTree;
        myTree = new TreeNode(0, leftTree, rightTree);
        isSym = sol.IsSymmetric(myTree);
        Console.WriteLine(isSym);
        Debug.Assert(isSym);
    }
}
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution {
    public bool IsSymmetric(TreeNode root) {
        if (root.left == null && root.right == null) { return true; }
        if (root.left == null || root.right == null) { return false; }

        // TreeNode currentLeft = root.left;
        // TreeNode currentLeft = root.right;

        Stack<TreeNode> leftStack = new Stack<TreeNode>();
        Stack<TreeNode> rightStack = new Stack<TreeNode>();
        leftStack.Push(root.left);
        rightStack.Push(root.right);

        while (leftStack.Count > 0 && rightStack.Count > 0) {
            TreeNode currentLeft = leftStack.Pop();
            TreeNode currentRight = rightStack.Pop();
            
            if (currentLeft == null || currentRight == null) {
                if (currentLeft != null || currentRight != null) { return false; }
            } else {
                Console.WriteLine(currentLeft.val);
                Console.WriteLine(currentRight.val);
                if (currentLeft.val != currentRight.val) { return false; }
                leftStack.Push(currentLeft.left);
                rightStack.Push(currentRight.right);

                leftStack.Push(currentLeft.right);
                rightStack.Push(currentRight.left);
            }

        }

        return leftStack.Count == rightStack.Count;
    }
}

/*
Ideas:
    Return inorder traversal and assert equal

    Traverse together, asserting values
*/