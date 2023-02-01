using System;
using System.Linq;
using System.Collections.Generic;

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
    }
}