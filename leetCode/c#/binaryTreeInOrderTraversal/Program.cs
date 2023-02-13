using System;
using System.Diagnostics;

class Program {
    static public void Main() {
        Solution sol = new Solution();
        List<int> inorderNodeList;

        TreeNode myNode = new TreeNode(0);
        myNode.left = new TreeNode(-1);
        inorderNodeList = (List<int>)sol.InorderTraversal(myNode);
        foreach (int myInt in inorderNodeList) {Console.WriteLine(myInt); }

    }
}
public class TreeNode {
    private int _val;
    private TreeNode _left;
    private TreeNode _right;
    public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
        this._val = val;
        this._left = left;
        this._right = right;
    }

    public TreeNode left {
        get => _left;
        set => _left = value;
    } 

    public TreeNode right {
        get => _right;
        set => _right = value;
    }

    public int val {
        get => _val;
        set => _val = value;
    }
}
 
public class Solution {
    public IList<int> InorderTraversal(TreeNode root) {
        List<int> resultList = new List<int>();

        if (root == null)  return new List<int>();

        if (root.left != null) {
            resultList.AddRange(InorderTraversal(root.left));
        }

        resultList.Add(root.val);

        if (root.right != null) {
            resultList.AddRange(InorderTraversal(root.right));
        }

        return resultList;
    }
}