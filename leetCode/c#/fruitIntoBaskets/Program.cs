using System;
using System.Diagnostics;

namespace FruitIntoBasket {
    class Program {
        static public void Main(string[] args) {
            Solution sol = new Solution();
            int[] fruits = new int[] {};
            int resultInt;
            
            fruits = new int[] { 6,2,1,1,3,6,6 };
            resultInt = sol.TotalFruit(fruits);
            Console.WriteLine(resultInt);
            Debug.Assert(resultInt == 3);
            Console.WriteLine("Test passed");
            Console.WriteLine();

            fruits = new int[] { 1,0,0,0,1,0,4,0,4 };
            resultInt = sol.TotalFruit(fruits);
            Console.WriteLine(resultInt);
            Debug.Assert(resultInt == 6);
            Console.WriteLine("Test passed");
            Console.WriteLine();

            fruits = new int[] { 1,0,1,4,1,4,1,2,3 };
            resultInt = sol.TotalFruit(fruits);
            Console.WriteLine(resultInt);
            Debug.Assert(resultInt == 5);
            Console.WriteLine("Test passed");
            Console.WriteLine();

            fruits = new int[] { 3,3,3,1,2,1,1,2,3,3,4 };
            resultInt = sol.TotalFruit(fruits);
            Console.WriteLine(resultInt);
            Debug.Assert(resultInt == 5);
            Console.WriteLine("Test passed");
            Console.WriteLine();

            fruits = new int[] { 1,2,3,2,2 };
            resultInt = sol.TotalFruit(fruits);
            Console.WriteLine(resultInt);
            Debug.Assert(resultInt == 4);
            Console.WriteLine("Test passed");
            Console.WriteLine();

            fruits = new int[] {1, 2, 1};
            resultInt = sol.TotalFruit(fruits);
            Console.WriteLine(resultInt);
            Debug.Assert(resultInt == 3);
            Console.WriteLine("Test passed");
            Console.WriteLine();

            fruits = new int[] {0,1,2,2};
            resultInt = sol.TotalFruit(fruits);
            Console.WriteLine(resultInt);
            Debug.Assert(resultInt == 3);
            Console.WriteLine("Test passed");
            Console.WriteLine();
        }
    }

    public class Solution {
        public int TotalFruit(int[] fruits) {
            int maxFruitPick = Math.Min(2, fruits.Length);

            // Initalizing variables so that they will be in the base state, fruit[i] is pointing to the next new fruit (or i = fruits.Length and is outside array)
            int i = 0;
            int startCount = 0;
            int firstFruit = fruits[0];
            int secondCount = 0;
            int secondFruit = -1;
            int startNumsSinceLastOther = 0;
            int secondNumsSinceLastOther = 1;
            while (i < fruits.Length && (secondFruit == -1 || fruits[i] == firstFruit || fruits[i] == secondFruit)) {
                if (fruits[i] == firstFruit) {
                    startCount += 1;
                    startNumsSinceLastOther += 1;
                    secondNumsSinceLastOther = 0;
                } else {
                    if (secondFruit == -1) {
                        secondFruit = fruits[i];
                    } 
                    secondCount += 1;
                    secondNumsSinceLastOther += 1;
                    startNumsSinceLastOther = 0;
                } 
                i += 1;
            }
            maxFruitPick = Math.Max(maxFruitPick, startCount + secondCount);

            // Change fruit to the new fruit at i and keep whichever fruit was last
            while (i < fruits.Length) {
                if (secondNumsSinceLastOther > 0) {
                    startCount = secondNumsSinceLastOther;
                    firstFruit = secondFruit;
                } else { startCount = startNumsSinceLastOther; }
                startNumsSinceLastOther = 0;
                secondFruit = fruits[i];
                secondCount = 1;
                secondNumsSinceLastOther = 1;
                i += 1;


                // Traverse to next different fruit from current two
                while (i < fruits.Length && (fruits[i] == firstFruit || fruits[i] == secondFruit)) {
                    int nextFruit = fruits[i];
                    if (nextFruit == firstFruit) { 
                        startCount += 1; 
                        startNumsSinceLastOther += 1;
                        secondNumsSinceLastOther = 0;
                    } else {
                        secondCount += 1; 
                        secondNumsSinceLastOther += 1;
                        startNumsSinceLastOther = 0;
                    }
                    i += 1;
                }
                maxFruitPick = Math.Max(maxFruitPick, startCount + secondCount);
            }

            return maxFruitPick;
        }
    }
}

/*
Data range/assumptions:
Fruit lengths n: [1, 10^5]
Fruit values: [0, n - 1]
*/

/*
Tests:
n = 1
n = 10^5
Don't pick first tree
Best fruits are way at the end
Pick all, but long
*/

/*
Ideas:

Naive:
    For each i
        Start picking
        Record two fruits ended up picking
        For next, if fruits are the same, then can simply subtract oldest one and add new one
            Saves on an O(n) traversal
    Worst case:
        Few duplicates, so saving step rarely triggers
            But few duplicates means it happens less?

Better: keep two separate counts
    Only one count can be discarded between moves
    Can use endpoint where last traversal stopped
        That's the theoretical first new fruit
    Changes if

For each i
    Subtract 1 from count of previous start
    For last end, find next unique, incrementing both counts we are maintaining

Time complexity: should be O(n) I believe
    Ultimately, traversing once in a complicated way

Problem/complication if count of previous starter is at one:
    Now that starter is a new unique

Handling intialization before loop:
    Program assumes i is a different letter
    But we're currently only assuming one
    Simple fix with a second loop for intialization
        But ugly

Problem: sometimes the number to remove is the first not the second
    Easy to fix on it's own, but creates other issues
        Numbers can interleave, which cuts them off partially
    Solution: maintain a "numbers since last other number" for each?
        Ugly








Recursive dynamic programming:
    Take max of two options:
        Start picking at i
        Max at i + 1
Back to front?
How to calculate if start picking at i?
    Can't just use the max for next, since may be picking different fruit
*/