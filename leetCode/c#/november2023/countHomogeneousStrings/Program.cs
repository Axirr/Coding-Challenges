using System.Diagnostics;

class Program {
    public static void Main() {
        string s;
        int result;
        Solution sol = new();

        s = "abbcccaa";
        result = sol.CountHomogenous(s);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result == 13);

        s = "zzzzz";
        result = sol.CountHomogenous(s);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result == 15);

        s = "xy";
        result = sol.CountHomogenous(s);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result == 2);
    }
}

public class Solution {
    public int CountHomogenous(string s) {
        int n = s.Length;
        int count = n;
        int currentStreak = 1;
        int modValue = (int)Math.Pow(10, 9) + 7;

        for (int i = 0; i < n - 1; i++) {
            if (s[i] == s[i + 1])  {
                count = (count + currentStreak) % modValue;
                currentStreak += 1;
            } else  currentStreak = 1;
        }

        return count;
    }
}

// public class Solution {

//     public int OldCountHomogenous(string s) {
//         int n = s.Length;
//         int totalWords = n;


//         List<(char, int)> frontier = new();
//         for (int i = 0; i < n - 1; i++)  {
//             frontier.Add((s[i], i));
//         }

//         while (frontier.Count > 0) {
//             (char, int) currentPair = frontier[frontier.Count - 1];
//             frontier.RemoveAt(frontier.Count - 1);

//             if (currentPair.Item2 < n - 1) {
//                 int nextIndex = currentPair.Item2 + 1;
//                 if (currentPair.Item1 == s[nextIndex]) {
//                     totalWords += 1;
//                     frontier.Add((currentPair.Item1, nextIndex));
//                 }
//             }
//         }


//         return totalWords % ((int)Math.Pow(10, 9) + 7);
//     }
// }

/*
Data range/assumptions:
string length n: [1, 10^5]
string character values: lowercase letter
result modulo 10^9 + 7
*/

/*
Tests:
n = 1
n = 10^5
all the same letter
all different letter
sequential repeated substrings "e.g. dogdogdog"
non-sequential repeated substrings
count under modulo limit
count over modulo limit
*/

/*
Ideas:

Better:
    Work backwards, and cache values that are already solved
    Have to record letter at index too
    Dyanmic programming:
        D[i] = 
            if s[i+1] = s[i], d[i+1]
            else 0
    Does that follow?
        Current method only deals with length 1

Naive:
    Repeatedly traverse, with increasing window size
        n = 1 ... n = n
    Incrementing counting dictionary
    Time complexity:
        summation n -> 1   = n^2?

Homogeneous = all same letter:
    Every homogeneous string starts from a length - 1 one
        Other than the initial letters
*/

/*
Completion time (minutes): 60
Question difficulty: Medium
How did it go (0 - 6): 2
    Misunderstood question
    Then solution was way too slow
How many runs before working solution: 2
*/