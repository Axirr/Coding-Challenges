public class Solution {
    public bool ArrayStringsAreEqual(string[] word1, string[] word2) {
        char currentLetter1 = word1[0][0];
        char currentLetter2 = word2[0][0];
        int currentLetterIndex1 = 0;
        int currentLetterIndex2 = 0;
        int currentWordIndex1 = 0; 
        int currentWordIndex2 = 0;

        while (true) {
            if (currentLetter1 != currentLetter2) {  return false;  }
            
            //Traverse next letter in word1
            currentLetterIndex1++;
            if (currentLetterIndex1 >= word1[currentWordIndex1].Length) {
                currentWordIndex1++;
                if (currentWordIndex1 >= word1.Length) {
                    break;
                }
                currentLetterIndex1 = 0;
            }
            currentLetter1 = word1[currentWordIndex1][currentLetterIndex1];

            // Traverse next letter in word2
            currentLetterIndex2++;
            if (currentLetterIndex2 >= word2[currentWordIndex2].Length) {
                currentWordIndex2++;
                if (currentWordIndex2 >= word2.Length) {
                    break;
                }
                currentLetterIndex2 = 0;
            }
            currentLetter2 = word2[currentWordIndex2][currentLetterIndex2];
        }
        if (currentWordIndex1 == word1.Length && currentWordIndex2 == (word2.Length - 1) && currentLetterIndex2 == word2[currentWordIndex2].Length - 1) {
            return true;
        } else {
            return false;
        }
    }
}


class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        string[] stringArray1 = {"hello", "world"};
        string[] stringArray2 = {"hello", "world"};
        bool resultBool = mySol.ArrayStringsAreEqual(stringArray1, stringArray2);
        Console.WriteLine(resultBool);
        Console.WriteLine("Should be True");
    }

}

/*
Data range/assumptions:
Non-empty
Large
Lowercase letters
Non-empty strings
*/

/*
Single word each
Not equal
Equal, but different slices
*/

/*
Ideas:
Naive;
    Concat strings
    Compare letter by letter

Better:
    Traverse directly in arrays
    while (true)
*/