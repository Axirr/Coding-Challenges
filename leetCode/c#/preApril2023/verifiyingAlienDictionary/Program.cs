using System;
using System.Diagnostics;

namespace verifyingAlienDictionary {
    class Program {
        public static void Main(string[] args) {
            Solution sol = new Solution();
            string[] words = new string[] { };
            string order = "";
            bool resultBool;

            words = new String[] { "hello","leetcode" };
            order = "hlabcdefgijkmnopqrstuvwxyz";
            resultBool = sol.IsAlienSorted(words, order);
            Console.WriteLine(resultBool);
            Debug.Assert(resultBool);

            words = new String[] { "word","world","row" };
            order = "worldabcefghijkmnpqstuvxyz";
            resultBool = sol.IsAlienSorted(words, order);
            Console.WriteLine(resultBool);
            Debug.Assert(!resultBool);

            words = new String[] { "apple","app" };
            order = "abcdefghijklmnopqrstuvwxyz" ;
            resultBool = sol.IsAlienSorted(words, order);
            Console.WriteLine(resultBool);
            Debug.Assert(!resultBool);
        }
    }
    public class Solution {
        public bool IsAlienSorted(string[] words, string order) {
            if (words.Length == 1)  { return true; }

            Dictionary<char,int> orderDict = DictionaryForOrder(order);

            for (int i=0; i < words.Length - 1; i++) {
                string word1 = words[i];
                string word2 = words[i + 1];
                int minLength = Math.Min(word1.Length, word2.Length);
                
                int j;
                for (j = 0; j < minLength; j++) {
                    if (orderDict[word1[j]] < orderDict[word2[j]])  { break; }
                    else if (orderDict[word1[j]] > orderDict[word2[j]])  { return false; }
                }

                // Ensure shorter word first, if end of shortest reached without definitive pass or fail
                if (j == minLength && word1.Length > word2.Length)  { return false; }
            }

            return true;
        }

        public Dictionary<char,int> DictionaryForOrder(string order) {
            Dictionary<char, int> resultDict = new Dictionary<char, int>();
            for (int i=0; i < order.Length; i++) {
                resultDict[order[i]] = i;
            }
            return resultDict;
        }
    }
}

/*
Data range/assumptions:
words length n: [1, 100]
length of a word: [1, 20]
length of order: [26]
*/

/*
Tests:
n = 1
n = 100
word = 1
word = 20
wrong order
word shorter than other, but match otherwise
*/

/*
Ideas:

Naive:
    for each word, for each letter
        letterIndex = 0
        find letter from letterIndex forward
            letterIndex = new index of letter
        if get to end without finding, return false 

Better: search shorter half for not present if i > 13

Misunderstood problem: comparing words to each other, not the letters in words

Checking neighbours good enough?
    If all neighbours are sorted, then list has to be sorted

Faster way to determine order than traversal
    Dictionary<char,int> with index for letter in order
*/