using System;
using System.Diagnostics;

namespace bestTeamWithNoConflicts {
    internal class Program
    {
        static void Main(string[] args)
        {
            int bestTeamScore;
            Solution sol = new Solution();
            int[] scores6 = new int[] { 319776,611683,835240,602298,430007,574,142444,858606,734364,896074 };
            int[] ages6 = new int[] { 1,1,1,1,1,1,1,1,1,1 };
            bestTeamScore = sol.BestTeamScore(scores6, ages6);
            Console.WriteLine(bestTeamScore);
            Debug.Assert(bestTeamScore == 5431066);
            return;
            int[] scores5 = new int[] { 1,3,7,3,2,4,10,7,5 };
            int[] ages5 = new int[]   { 4,5,2,1,1,2,4, 1,4 };
            bestTeamScore = sol.BestTeamScore(scores5, ages5);
            Console.WriteLine(bestTeamScore);
            // Debug.Assert(bestTeamScore == 29);
            int[] scores4 = new int[] {9,2,8,8,2};
            int[] ages4 = new int[] {4,1,3,3,5};
            bestTeamScore = sol.BestTeamScore(scores4, ages4);
            Console.WriteLine(bestTeamScore);
            Debug.Assert(bestTeamScore == 27);
            int[] scores = new int[] { 1,3,5,10,15 };
            int[] ages = new int[] { 1,2,3,4,5 };
            bestTeamScore = sol.BestTeamScore(scores, ages);
            Console.WriteLine(bestTeamScore);
            Debug.Assert(bestTeamScore == 34);
            int[] scores2 = new int[] { 4, 5, 6, 5 };
            int[] ages2 = new int[] { 2,1,2,1 };
            bestTeamScore = sol.BestTeamScore(scores2, ages2);
            Console.WriteLine(bestTeamScore);
            Debug.Assert(bestTeamScore == 16);
            int[] scores3 = new int[] {1,2,3,5};
            int[] ages3 = new int[] { 8,9,10,1 };
            bestTeamScore = sol.BestTeamScore(scores3, ages3);
            Console.WriteLine(bestTeamScore);
            Debug.Assert(bestTeamScore == 6);
        }
    }
    public class Solution {
        public int BestTeamScore(int[] scores, int[] ages) {
            return HelperBestTeamScore(scores, ages, 0);
        }
        public int HelperBestTeamScore(int[] scores, int[] ages, int startIndex) {
            int maxTeam = 0;
            int[] myScores = scores;
            for (int i=startIndex; i < myScores.Length; i++) {
                int currentSum = myScores[i];
                int maxAge = ages[i];
                int maxScore = scores[i];
                for (int j=i+1; j < myScores.Length; j++) {
                    // if ((ages[j] == maxAge && scores[j] >= maxScore) || scores[j] == maxScore) {
                    if (scores[j] == maxScore && ages[j] != maxAge) {
                        int newMax = HelperBestTeamScore(scores, ages, j);
                        if (j + 1 < myScores.Length) {
                            newMax = Math.Max(newMax, HelperBestTeamScore(scores, ages, j+1));
                        }
                        currentSum += newMax;
                        break;
                    }
                    else if ((scores[j] == maxScore && ages[j] == maxAge) || (ages[j] > maxAge && scores[j] > maxScore) || (ages[j] < maxAge && scores[j] < maxScore)) {
                        currentSum += myScores[j];
                    }
                    // Console.WriteLine(currentSum);
                }
                // Console.WriteLine("End current sum {0}", currentSum);
                maxTeam = Math.Max(maxTeam, currentSum);
            }
            return maxTeam;
        }
    }
}

/*
Data range/assumptions:
scores and ages length n: [1, 1000]
scores: [1, 10^6]
ages: [1, 1000]
*/

/*
Tests:
n = 1
n = 1000
*/

/*
Ideas:

Naive:
    Sort by max
    Three potential options:
        Take player and everyone else if allowed
            Score: playerScore + recursiveScore([i + 1:])
        Take player and no conflicts
            Score: playerScore + recursiveScore([i + 1:])
        Leave player
            Score: recursiveScore([i + 1:])
    Take the max of these 3 options

How to determine conflicts quickly?

This approach is flawed:
    If later we find an amazing player at a young age, we would want
        to add back in young players we have excluded

Dynamic programming tabulation:
    D[i] = max(
        playerScore + d[i-1], if no conflict
        playerScore
    )
    Not as simple as that
        Don't have to drop all players, just conflict ones

Define max scores with age limit
    I.e. if we only take players age X, what's our max
    Then use previous age limit level and make those three choices (take, leave, leave conflcits)
    Same issue though: amazing young player means have to add back in

Seems like stepwise solutions won't work
Conflict free sets using score and age limits
    Create a set starting at each point that is conflict free
    First element is definitely included
    Others assessed for conflicts
    Thus every element will be in a potential set

Naive: calculate the sum for all non-conflicting subarrays, starting at each location
    n^2
    Does it work?
    Reading headings of solution, didn't look like this
        Top down dynamic
        Bottom up dynamic

Problem with naive: players with same age
    Can include those, but they put extra limitations on the solution
    Recursive call could solve
    But can't just be straight recursive, since that would automatically include the first element
        We only want that at the top level?

Close but now having an issue when ages are the same
    Same issue: can include, but may not want to, since the max score would have to change
    Seems like solution for same score should handle it, but it isn't
*/