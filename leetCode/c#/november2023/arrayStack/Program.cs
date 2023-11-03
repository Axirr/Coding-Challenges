namespace arrayStack {
    public class Program {
        public static void Main() {
            int[] target;
            int n;
            Solution sol = new();
            List<string> result;

            target = new int[] {1,3};
            n = 3;
            result = (List<string>)sol.BuildArray(target, n);
            foreach (string operation in result)  Console.WriteLine(operation);
        }

        public class Solution {
            public IList<string> BuildArray(int[] target, int n) {
                int currentNum = 1;
                int targetIndex = 0;
                string pushString = "Push";
                string popString = "Pop";
                List<string> result = new();
                while (currentNum <= n && targetIndex < target.Length) {
                    result.Add(pushString);
                    if (currentNum == target[targetIndex]) {
                        targetIndex += 1;
                    } else {
                        result.Add(popString);
                    }

                    currentNum += 1;
                }

                return result;
            }
        }
    }
}

/*
Data range/assumptions:
length of target: n
n: [1, 100]
*/

/*
Tests:
n = 1
n = 100
*/

/*
Ideas:

Naive:
    Keep pointer in target to "next value"
    While current < n:
        Always push
        If top < target[pointer]:
            pop
        else:
            pointer += 1
    
    Time complexity: n
*/

/*
Completion time (minutes): 23
Question difficulty: Medium
How did it go (0 - 6): 3
    Took a while to understand what question was asking
    Some issues with namespaces and static methods
*/