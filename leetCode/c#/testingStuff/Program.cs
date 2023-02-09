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

        Card myCard = new Card(7, "Clubs");
        Console.WriteLine($"{myCard.Rank} of {myCard.Suit}");
        myCard.Rank = 9;
        myCard.Suit = "Spaghetti";
        Console.WriteLine($"{myCard.Rank} of {myCard.Suit}");

        int mySwitchInt = 5;
        switch (mySwitchInt) {
            case 5:
                Console.WriteLine("Num was 5");
                break;
            default:
                Console.WriteLine("Default");
                break;
        }

        Season mySeason = Season.Fall;
        Console.WriteLine(mySeason);

        Circle myCircle = new Circle(123);
        Console.WriteLine(myCircle.LargestDimension);

        Dog myDog = new Dog("brown");
        Console.WriteLine(myDog.Color);
        Console.WriteLine(myDog.HeartBeat);
    }
    enum Season {
        Spring, Summer, Fall, Winter
    }

    class Card {
        private int _rank;
        private string _suit;

        public Card(int rank, string suit) {
            _rank = rank;
            _suit = suit;
        }

        public int Rank {
            get => _rank;
            set {
                _rank = value;
            }
        }
        public string Suit {
            get => _suit;
            set {
                _suit = value;
            }
        }
    }

    interface Shape {
        abstract public int LargestDimension {
            get;
            set;
        }
    }

    class Circle : Shape {
        private int _radius;

        public Circle(int radius) {
            _radius = radius;
        }

        public int LargestDimension {
            get => _radius;
            set => _radius = value;
        }
    }

    abstract class Animal {
        public string HeartBeat {
            get => "bum bum";
        }

        abstract public string Color {
            get;
            set;
        }
    }

    class Dog : Animal {
        private string _color;

        public Dog(string color) {
            _color = color;
        }

        public override string Color {
            get => _color;
            set => _color = value;
        }
    }
}