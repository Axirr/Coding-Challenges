
public class Solution {
    public int MaxLength(IList<string> arr) {
        for (int i = arr.Count - 1; i >= 0; i--) {
            if (StringHasDuplicates(arr[i])) {
                arr[i] = "";
            }
        }
        int currentMax;
        int runningMax = 0;
        string stringForLength = "";
        for (int i = 0; i < arr.Count; i++) {
            currentMax = 0;
            List<List<string>> result = HelperMaxLength(arr, i);
            List<string> currentMaxList = new List<string>();
            foreach (List<string> tempStringList in result) {
                stringForLength = "";
                foreach (string mySubstring in tempStringList) {
                    stringForLength += mySubstring;
                }
                if (stringForLength.Length > currentMax) {
                    currentMax = stringForLength.Length;
                    // currentMaxList = tempStringList;
                }
            }
            // Console.WriteLine("Current Max");
            // Console.WriteLine(currentMax);
            // Console.WriteLine();
            runningMax = Math.Max(currentMax, runningMax);
        }
        return runningMax;
    }

    public List<List<string>> HelperMaxLength(IList<string> arr, int startIndex) {
        List<List<string>> letterMaskList = new List<List<string>>();
        if (startIndex == arr.Count - 1) {
            List<string> tmpStringList = new List<string>();
            tmpStringList.Add(arr[startIndex]);
            letterMaskList.Add(tmpStringList);
        } else {
            List<List<string>> tempDoubleList = HelperMaxLength(arr, startIndex + 1);
            foreach (List<string> subcaseMaskList in tempDoubleList) {
                string subcaseMask = "";
                foreach (string myStr in subcaseMaskList) {
                    subcaseMask += myStr;
                }
                // Console.WriteLine(subcaseMask);
                string currentWord = arr[startIndex];
                Dictionary<char, int> subcaseCount = new Dictionary<char, int>();
                foreach (char letter in subcaseMask) {
                    if (!subcaseCount.ContainsKey(letter)) {
                        subcaseCount.Add(letter, 1);
                    }
                }

                bool hasDuplicates = false;
                foreach (char letter in currentWord) {
                    if (subcaseCount.ContainsKey(letter)) {
                        hasDuplicates = true;
                        break;
                    }
                }
                int alternateValue = currentWord.Length;
                if (!hasDuplicates) {
                    subcaseMaskList.Add(currentWord);
                    letterMaskList.Add(subcaseMaskList);
                } else {
                    int currentCount = currentWord.Length;
                    List<string> currentList = new List<string>();
                    currentList.Add(currentWord);
                    for (int i = subcaseMaskList.Count - 1; i >= 0; i--) {
                        string subcaseWord = subcaseMaskList[i];
                        if (!DoubleStringsHaveDuplicates(currentWord, subcaseWord)) {
                            currentCount += subcaseWord.Length;
                            currentList.Add(subcaseWord);
                        }
                    }
                    letterMaskList.Add(subcaseMaskList);
                    letterMaskList.Add(currentList);
                    // if (currentCount > subcaseMask.Length) {
                    //     letterMaskList.Add(currentList);
                    // } else if (currentCount < subcaseMask.Length) {
                    //     letterMaskList.Add(subcaseMaskList);
                    // } else {
                    //     letterMaskList.Add(subcaseMaskList);
                    //     letterMaskList.Add(currentList);
                    // }
                }
            }
        }
        if (false) {
            foreach (List<string> myStrList in letterMaskList) {
                foreach (string myStr in myStrList) {
                    Console.Write(myStr);
                }
            }
            Console.WriteLine();
        }
        return letterMaskList;
    }

    public bool StringHasDuplicates(string myString) {
        Dictionary<char, int> countDictionary = new Dictionary<char, int>();
        foreach (char letter in myString) {
            if (countDictionary.ContainsKey(letter)) {
                return true;
            } else {
                countDictionary.Add(letter, 1);
            }
        }
        return false;
    }

    public bool DoubleStringsHaveDuplicates(string string1, string string2) {
        Dictionary<char, int> countDictionary = new Dictionary<char, int>();
        foreach (char letter in string1) {
            if (!countDictionary.ContainsKey(letter)) {
                countDictionary.Add(letter, 1);
            }
        }
        foreach (char letter in string2) {
            if (countDictionary.ContainsKey(letter)) {
                return true;
            }
        }
        return false;
    }
}

class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        int resultInt;
        string[] firstStringArray = {"abcd"};
        resultInt = mySol.MaxLength(firstStringArray);
        Console.WriteLine(resultInt);
        Console.WriteLine("Should be 4");
        string[] thirdStringArray = {"abb"};
        resultInt = mySol.MaxLength(thirdStringArray);
        Console.WriteLine(resultInt);
        Console.WriteLine("Should be 0");
        string[] secondStringArray = {"un","iq","ue"};
        resultInt = mySol.MaxLength(secondStringArray);
        Console.WriteLine(resultInt);
        Console.WriteLine("Should be 4");
        string[] fourthStringArray = {"abcd", "a", "b", "c", "d", "e"};
        resultInt = mySol.MaxLength(fourthStringArray);
        Console.WriteLine(resultInt);
        Console.WriteLine("Should be 5");
        string[] fifthStringArray = {"abc","def","bp","dq","eg","fh"};
        resultInt = mySol.MaxLength(fifthStringArray);
        Console.WriteLine(resultInt);
        Console.WriteLine("Should be 9");
        string[] sixthStringArray = {"ab","cd","cde","cdef","efg","fgh","abxyz"};
        resultInt = mySol.MaxLength(sixthStringArray);
        Console.WriteLine(resultInt);
        Console.WriteLine("Should be 11");
    }

}

/*
Data range/assumptions:
Non-empty
Small array length
Medium string length
All lowercase
*/

/*
Test cases:
Single item
    Return length
Single item, string with duplicates
Many strings with duplicates
Max n
All unqiue
Only one unique
Longest unique at the back
abcd, versus single letter a - e
    I.e. long is a bad choice
*/

/*
Ideas:

Naive:
    Remove all with duplicates
    Create all combinations of strings
    Check for duplicates
    n!?
    Bad, even at this scale

Better:
    Remove all with duplicates
    Construct a set of letters for each string
        Strings are the set already since no duplicates

Want longest usually but not always
    E.g. abcd, versus single letter a - e

Matching sets ensuring condition of mutual exclusivity
    Start with sets n = 1
    Construct sets n = 2?
    From those, sets n = 3
    Should get smaller and smaller, since many conflicts
        Worst case: 26 singletons

Dynamic programming:
    Indices:
        number of sets, length
        D(n, len) = D(n - 1, len - last.len)

Recursive combos:
    maxCombos(i) = max(i + arr[i+1:], arr[i+1])
        Only first if valid based on the returned mask?
        Len is mask



Almost, but potentially big issue:
    Solution is order dependent
    Only analysis is "take bigger one" in case of duplicates
        Not correct
    Alternative:
        Remove all duplicates and put in our new one
        Compare size of those

Restructure to return string[] not just string
*/