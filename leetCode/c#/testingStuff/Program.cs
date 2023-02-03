using System;
using System.Linq;
using System.Collections.Generic;
using System.Linq;

class Program {
    public static void Main(string[] args) {
        string myString = "hello";
        foreach (char letter in myString) { Console.WriteLine(letter); }
        for (int i=0; i < myString.Length; i++) { Console.WriteLine(myString[i]); }
        Console.WriteLine(myString.ToUpper());
        string subString = "";
        subString = myString.Substring(0, myString.Length);
        Console.WriteLine(subString);
        subString = myString.Substring(2, 2);
        Console.WriteLine(subString);

        int[] myArray = new int[3];
        for (int i=0; i < 3; i++) {
            myArray[i] = i;
        }
        for (int i=0; i < 3; i++) {
            Console.WriteLine(myArray[i]);
        }

        Console.WriteLine();

        List<int> myList = new List<int>();
        myList.Add(2);
        myList.Add(3);
        foreach (int myNum in myList)  { Console.WriteLine(myNum); }
        Console.WriteLine();
        myList.RemoveAt(myList.Count - 1);
        foreach (int myNum in myList)  { Console.WriteLine(myNum); }
        Console.WriteLine();
        myList.Add(3);
        myList.RemoveAt(0);
        foreach (int myNum in myList)  { Console.WriteLine(myNum); }
        Console.WriteLine();

        int[] myIntArray = new int[] { 1, 2, 3, 4, 11, 12, 15, 16 };
        IEnumerable<int> evenQuery = 
            from myInt in myIntArray
            where myInt % 2 == 0
            select myInt;
        foreach (int num  in evenQuery)  { Console.WriteLine(num); }
    }
}