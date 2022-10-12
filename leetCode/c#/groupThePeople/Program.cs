using System.Collections.Generic;

class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        int[] myArray = {3,3,3, 3, 3, 3, 1};
        List<IList<int>> resultList = (List<IList<int>>) mySol.GroupThePeople(myArray);
        foreach(List<int> groupList in resultList) {
            Console.WriteLine("Group size {0}", groupList.Count);
            foreach (int currentInt in groupList) {
                Console.WriteLine(currentInt);
            }
        }
    }

}

public class Solution {
    public IList<IList<int>> GroupThePeople(int[] groupSizes) {
        List<List<int>> workingList = new List<List<int>>();
        Dictionary<int, List<int>> groupDict = new Dictionary<int, List<int>>();
        int currentGroupSize;
        List<int> tempList;
        for (int i = 0; i < groupSizes.Length; i++) {
            currentGroupSize = groupSizes[i];
            if (groupDict.ContainsKey(currentGroupSize)) {
                groupDict[currentGroupSize].Add(i);
            } else {
                tempList = new List<int> {i};
                groupDict.Add(currentGroupSize, tempList);
            }
        }
        int groupSize;
        List<int> groupPeople;
        foreach (var myPair in groupDict) {
            groupSize = myPair.Key;
            groupPeople = myPair.Value;
            List<int> partialResultList = new List<int>();
            for (int i = 0; i < groupPeople.Count; i++) {
                if (partialResultList.Count == groupSize) {
                    workingList.Add(partialResultList);
                    partialResultList = new List<int>();
                }
                partialResultList.Add(groupPeople[i]);
            }
            workingList.Add(partialResultList);
        }
        IList<IList<int>> resultList = new List<IList<int>>();
        foreach (var myList in workingList) {
            resultList.Add(myList);
        }
        return resultList;
    }
}

/*
Data range/assumptions:
Non-empty
Medium size n
Always a valid solution
Order doesn't matter
Ordering of groups doesn't matter?
    Although their solutions are always in order from smallest to largest groups
*/

/*
Test cases:
Single group
All the same
Multiple groups of the same size
All ones?
*/

/*
Ideas:
Naive:
    Put person indexes in a list for their group size
    Divide collective group list into subgroups of appropriate size
    Time complexity:
        n for traversal
        n for traversals to create group sizes
            This is avoidable

Seems too simple

Dictionary
    key: groupSize
    value: [people in groups]
*/