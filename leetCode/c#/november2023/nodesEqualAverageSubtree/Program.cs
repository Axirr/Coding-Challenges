using System.Diagnostics;

namespace nodesEqualAverageSubTree {
    public class Program {
        public static void Main() {
            TreeNode root;
            int result;
            Solution sol = new();

            root = new TreeNode(4, new TreeNode(8, new TreeNode(0), new TreeNode(1)), new TreeNode(5, null, new TreeNode(6)));
            result = sol.AverageOfSubtree(root);
            Console.WriteLine("final result {0}", result);
            Debug.Assert(result == 5);
        }
    }
    public class TreeNode {
        public int val;
        public TreeNode? left;
        public TreeNode? right;
        public TreeNode(int val=0, TreeNode? left=null, TreeNode? right=null) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    public class Solution {
        public int AverageOfSubtree(TreeNode root) {
            int[] globalCount = new int[] {0};
            RecursiveCount(root, globalCount);


            return globalCount[0];
        }
        public int[] RecursiveCount(TreeNode root, int[] globalCount) {
            int sum = root.val;
            int count = 1;
            if (root.left != null)  {
                int[] subtreeResult = RecursiveCount(root.left, globalCount);
                sum += subtreeResult[0];
                count += subtreeResult[1];
            }

            if (root.right != null)  {
                int[] subtreeResult = RecursiveCount(root.right, globalCount);
                sum += subtreeResult[0];
                count += subtreeResult[1];
            }

            if (root.val == sum / count) {
                globalCount[0] += 1;
            }

            return new int[] {sum,count};
        }

    }
}

/*
Data range/assumptions:
tree size n: [1, 1000]
values: [0, 1000]
*/

/*
Tests:
n = 1
n = max
values max
values min
values uniform
values mixed
all equal
only leaves equal
*/

/*
Ideas:

Naive:
    Recursive, get count and sum of values of child trees
    Add root and use count + 1 to determine average
    If root = average, increment global count + 1
*/

/*
Completion time (minutes): 16
Question difficulty: Medium
How did it go (0 - 6): 5
*/