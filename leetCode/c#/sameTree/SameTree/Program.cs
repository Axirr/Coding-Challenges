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
            // Console.WriteLine(areSame);
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
    // def treeFromList(self, myList):
    //     root = None
    //     nodes = [TreeNode(myList[0])]
    //     root = nodes[0]
    //     for i in range(len(myList)):
    //         currentRoot = nodes[i]
    //         if currentRoot is None:
    //             nodes.append(None)
    //             nodes.append(None)
    //             continue
    //         leftIndex = i // 2 * 2 + 1
    //         rightIndex = i // 2 * 2 + 2
    //         if len(myList) > leftIndex and myList[leftIndex] != None:
    //             currentRoot.left = TreeNode(myList[leftIndex])
    //             nodes.append(currentRoot.left)
    //         else:
    //             nodes.append(None)
    //         if len(myList) > rightIndex and myList[rightIndex] != None:
    //             currentRoot.right = TreeNode(myList[rightIndex])
    //             nodes.append(currentRoot.right)
    //         else:
    //             nodes.append(None)
    //     return root
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

            Queue<TreeNode> pStack = new Queue<TreeNode>();
            pStack.Enqueue(p);
            Queue<TreeNode> qStack = new Queue<TreeNode>();
            qStack.Enqueue(q);
            Console.WriteLine(pStack.Count);

            while (pStack.Count > 0 && qStack.Count > 0) {
                TreeNode currentP = pStack.Dequeue();
                TreeNode currentQ = qStack.Dequeue();
                // Console.WriteLine(currentP.val);
                // Console.WriteLine(currentQ.val);
                if (currentP.val != currentQ.val) { return false; }
                if (currentP.left == null && currentQ.left != null) { return false; }
                if (currentQ.left == null && currentP.left != null) { return false; }
                if (currentP.right == null && currentQ.right != null) { return false; }
                if (currentQ.right == null && currentP.right != null) { return false; }
                // if (currentP.left != currentQ.left) { return false; }
                // if (currentP.right != currentQ.right) { return false; }
                if (currentP.left != null) {
                    pStack.Enqueue(currentP.left); 
                }
                if (currentQ.left != null) {
                    qStack.Enqueue(currentQ.left); 
                }
                if (currentP.right != null) {
                    pStack.Enqueue(currentP.right); 
                }
                if (currentQ.right != null) {
                    qStack.Enqueue(currentQ.right); 
                }
            }

            // Console.WriteLine($"pStack count {pStack.Count}");
            // Console.WriteLine($"qStack count {qStack.Count}");

            return pStack.Count == qStack.Count;
        }
    }
}