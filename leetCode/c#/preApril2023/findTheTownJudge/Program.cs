using System;
using System.Diagnostics;

namespace findTheTownJudge {
    internal class Program
    {
        static void Main(string[] args)
        {
            int n = 2;
            int[][] trust = new int[1][];
            int[] tempArray = new int[2] {1, 2};
            trust[0] = tempArray;
            Solution sol = new Solution();
            int judgeNum = sol.FindJudge(n, trust);
            Console.WriteLine(judgeNum);
            Debug.Assert(judgeNum == 2);
        }
    }
    public class Solution {
        public int FindJudge(int n, int[][] trust) {
            if (n == 1) { return 1; }

            HashSet<int> trustsSomeone = new HashSet<int>();

            List<List<int>> adjacencyList = new List<List<int>>();
            adjacencyList.Add(new List<int> {});

            for (int i = 0; i < n; i++) {
                adjacencyList.Add(new List<int> {});
                trustsSomeone.Add(i + 1);
            }

            for (int i = 0; i < trust.Count(); i++) {
                int[] myTrust = trust[i];
                adjacencyList[myTrust[1]].Add(myTrust[0]);
                trustsSomeone.Remove(myTrust[0]);
            }

            foreach (var item in trustsSomeone) {
                if (adjacencyList[item].Count == n - 1) { return item; }
            }

            return -1;
        }
    }
}