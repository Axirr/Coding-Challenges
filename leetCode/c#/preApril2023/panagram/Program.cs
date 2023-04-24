using System;

class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        string myString = "thequickbrownfoxjumpsoverthelazydog";
        bool resultBool = mySol.CheckIfPangram(myString);
        Console.WriteLine(resultBool);
    }

}
public class Solution {
    public bool CheckIfPangram(string sentence) {
        List<char> alphabetArray = new List<char>();
        alphabetArray.AddRange("abcdefghijklmnopqrstuvwxyz");
        int alphabetIndex = -1;
        foreach (char letter in sentence) {
            alphabetIndex = alphabetArray.IndexOf(letter);
            if (alphabetIndex != -1) {
                alphabetArray.RemoveAt(alphabetIndex);
                if (alphabetArray.Count == 0) {  return true;  }
            }
        }
        foreach (char letter in alphabetArray) {
            Console.WriteLine(letter);
        }
        return false;
    }
}

/*
Data range/assumptions:
Medium length sentence
Non-empty
Lowercase only
*/

/*
Single letter
Max length (1000)
Exactly all 26
All 26 with extras
Less than 26
All repeats
*/

/*
Ideas:

Naive:
    letterList
    for letter in string
        if letter in letterList:
            letterList.pop(letter)
            if len(letterList) == 0:
                return true
    return false
*/