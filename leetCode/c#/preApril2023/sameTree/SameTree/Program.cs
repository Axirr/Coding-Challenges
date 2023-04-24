using System;
using System.Diagnostics;
using System.Collections.Generic;

namespace SameTree {
    class Program {
        public static void Main(string[] args) {
            Solution sol = new Solution();
            bool areSame;
            TreeNode p = new TreeNode();
            TreeNode q = new TreeNode();
            int[] listForInit = new int[] {};


            listForInit = new int[] { 1, 2, 3 };
            p = TreeFromList(listForInit);
            q = TreeFromList(listForInit);
            areSame = sol.IsSameTree(p, q);
            Console.WriteLine(areSame);
            Debug.Assert(areSame);
        }

        public static TreeNode TreeFromList(int[] dataArray) {
            List<TreeNode?> nodes = new List<TreeNode?>();
            nodes.Add(new TreeNode(dataArray[0]));
            TreeNode root = nodes[0];
            for (int i=0; i < dataArray.Length; i ++) {
                TreeNode currentRoot = nodes[i];
                if (currentRoot == null) {
                    nodes.Add(null);
                    nodes.Add(null);
                    continue;
                }
                int leftIndex = i / 2 * 2 + 1;
                int rightIndex = i / 2 * 2 + 2;
                if (dataArray.Length > leftIndex && dataArray[leftIndex] != null) {
                    currentRoot.left = new TreeNode(dataArray[leftIndex]);
                    nodes.Add(currentRoot.left);
                } else {nodes.Add(null); }
                if (dataArray.Length > rightIndex && dataArray[rightIndex] != null) {
                    currentRoot.right = new TreeNode(dataArray[rightIndex]);
                    nodes.Add(currentRoot.right);
                } else {nodes.Add(null); }
            }
            return root;
        }
    }

    public class TreeNode {
        public int val;
        public TreeNode left;
        public TreeNode right;
        public TreeNode(int val=0, TreeNode? left=null, TreeNode? right=null) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }


public class Solution {
        public bool IsSameTree(TreeNode p, TreeNode q) {
            if (p == null || q == null) {
                if (p == null && q == null) { return true; }
                return false;
            }

            List<TreeNode> pStack = new List<TreeNode>();
            pStack.Add(p);
            List<TreeNode> qStack = new List<TreeNode>();
            qStack.Add(q);

            while (pStack.Count > 0 && qStack.Count > 0) {
                TreeNode currentP = pStack[pStack.Count - 1];
                pStack.RemoveAt(pStack.Count - 1);
                TreeNode currentQ = qStack[qStack.Count - 1];
                qStack.RemoveAt(qStack.Count - 1);

                if (currentP.val != currentQ.val) { return false; }

                if (currentP.left == null && currentQ.left != null) { return false; }
                if (currentQ.left == null && currentP.left != null) { return false; }
                if (currentP.right == null && currentQ.right != null) { return false; }
                if (currentQ.right == null && currentP.right != null) { return false; }

                if (currentP.left != null) {
                    pStack.Add(currentP.left); 
                }
                if (currentQ.left != null) {
                    qStack.Add(currentQ.left); 
                }
                if (currentP.right != null) {
                    pStack.Add(currentP.right); 
                }
                if (currentQ.right != null) {
                    qStack.Add(currentQ.right); 
                }
            }

            return pStack.Count == qStack.Count;
        }
    }
}