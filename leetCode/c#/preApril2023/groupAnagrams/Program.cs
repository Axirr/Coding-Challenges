public class Solution {
    public IList<IList<string>> GroupAnagrams(string[] strs) {
        Dictionary<string, List<string>> wordDictionary = new Dictionary<string, List<string>>();
        foreach (string word in strs) {
            char[] sortedWord = word.ToCharArray();
            Array.Sort(sortedWord);
            string sortedWordString = new string(sortedWord);
            if (!wordDictionary.ContainsKey(sortedWordString)) {
                List<string> newEntry = new List<string>();
                newEntry.Add(word);
                wordDictionary.Add(sortedWordString, newEntry);
            } else {
                wordDictionary[sortedWordString].Add(word);
            }
        }
        List<IList<string>> resultList = new List<IList<string>>();
        foreach (var keyValuePair in wordDictionary) {
            resultList.Add(keyValuePair.Value);
        }
        return  resultList;
    }
}


class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        string[] stringArray = {"eat","tea","tan","ate","nat","bat"};
        List<IList<string>> resultList = (List<IList<string>>) mySol.GroupAnagrams(stringArray);
        foreach (var group in resultList) {
            foreach (var word in group) {
                Console.WriteLine(word);
            }
            Console.WriteLine();
        }
    }

}

/*
Data range/assumptions:
Non-empty
Many strings
Lowercase
*/

/*
Test cases:
Single string
Max size
All in one group
All in different groups
*/

/*
Ideas:

Naive:
    Sort each word
    Put in dictionary for that word
    For key in dictionary, construct result list
    Time complexity:
        n * 100 log (100) worst case for sort and put in dict
        Construction at end is n worst case
        n log n
            Seems reasonable
*/