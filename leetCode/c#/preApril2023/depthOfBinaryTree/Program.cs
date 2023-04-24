using System;
using System.Diagnostics;
using System.Collections.Generic;
class Program {
    public static void Main(string[] args)
    {
        Solution sol = new Solution();
        int depth;
        TreeNode root;

        root = new TreeNode(5);
        depth = sol.MaxDepth(root);
        Console.WriteLine(depth);
        Debug.Assert(depth == 1);
        
        root = new TreeNode(-22);
        root.left = new TreeNode(100);
        depth = sol.MaxDepth(root);
        Console.WriteLine(depth);
        Debug.Assert(depth == 2);
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
    public int MaxDepth(TreeNode root) {
        if (root == null) return 0;

        List<TreeNode> frontier = new List<TreeNode>();
        frontier.Add(root);
        List<TreeNode> nextFrontier = new List<TreeNode>();
        int maxDepth = 1;

        while (frontier.Count > 0) {
            while (frontier.Count > 0) {
                TreeNode currentNode = frontier[frontier.Count - 1];
                frontier.RemoveAt(frontier.Count - 1);
                if (currentNode.left != null)  nextFrontier.Add(currentNode.left);
                if (currentNode.right != null)  nextFrontier.Add(currentNode.right);
            }

            if (nextFrontier.Count == 0)  break;

            maxDepth += 1;
            frontier = nextFrontier;
            nextFrontier = new List<TreeNode>();
        }

        return maxDepth;
    }
}

/*
Data range/assumptions:
number of nodes n: [0, 10^4]
Node values: [-100, 100]
*/

/*
Tests:
n = 0
n = 1
n = 10^4
*/

/*
Ideas:

Naive:
    BFS, level by level, incrementing depth count 
    while frontier
        ...

        frontier = nextFrontier 
        depth += 1
*/

/*
Went well (y/n)?    y
If not, why?    n/a
*/