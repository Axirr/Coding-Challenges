using System.Diagnostics;

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

class Program {
    public static void Main(string[] args) {
        Solution sol = new Solution();
        TreeNode tree;
        int[] result;

        tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(2)));
        result = sol.FindMode(tree);
        Debug.Assert(result[0] == 2);
        Console.WriteLine(result[0].ToString());

        tree = new TreeNode(1, null, new TreeNode(2));
        result = sol.FindMode(tree);
        Array.Sort(result);
        Console.WriteLine(String.Join(",", result));
        Debug.Assert(result[0] == 1);
        Debug.Assert(result[1] == 2);
    }

}

public class Solution {
    public int[] FindMode(TreeNode root) {
        Dictionary<int, int> valueCount = new Dictionary<int, int>();
        Queue<TreeNode> frontier = new Queue<TreeNode>();
        frontier.Enqueue(root);
        while (frontier.Count > 0) {
            TreeNode currentNode = frontier.Dequeue();
            if (valueCount.ContainsKey(currentNode.val)) {
                valueCount[currentNode.val] += 1;
            } else {
                valueCount[currentNode.val] = 1;
            }

            if (currentNode.right != null)  frontier.Enqueue(currentNode.right);
            if (currentNode.left != null)  frontier.Enqueue(currentNode.left);
        }

        int maxCount = 0;
        List<int> result = new List<int>();

        foreach (KeyValuePair<int, int> pair in valueCount) {
            if (pair.Value >= maxCount) {
                if (pair.Value > maxCount) {
                    result = new List<int>();
                    maxCount = pair.Value;
                }

                result.Add(pair.Key);
            }
        }

        return result.ToArray();
    }
}

/*
Data range/assumptions:
length n of array: [1, 10^4]
values: [-10^5, 10^5]
*/

/*
Tests:
n = 1
n = 10^4
values max
values min
values uniform
values mixed
*/

/*
Ideas:

Naive:
    Traverse tree with a counting dictionary

    Time complexity: O(n)
    Space complexity: O(n) worst case
*/

/*
Completion time (minutes): 
Question difficulty: 
How did it go (0 - 6): 
*/