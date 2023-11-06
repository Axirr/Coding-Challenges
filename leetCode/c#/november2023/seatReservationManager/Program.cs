public class Program {
    public static void Main() {
        int n;

        n = 5;
        SeatManager mySeatM = new(n);
        Console.WriteLine(mySeatM.Reserve());
        Console.WriteLine(mySeatM.Reserve());
        mySeatM.Unreserve(2);
        Console.WriteLine(mySeatM.Reserve());
        Console.WriteLine(mySeatM.Reserve());
        Console.WriteLine(mySeatM.Reserve());
    }
}
public class SeatManager {
    private PriorityQueue<int,int> heap;
    private HashSet<int> reservedSeats;

    public SeatManager(int n) {
        this.heap = new();
        for (int i = 1; i <= n; i++)  this.heap.Enqueue(i, i);
        this.reservedSeats = new();
    }
    
    public int Reserve() {
        int newSeat = this.heap.Dequeue();
        this.reservedSeats.Add(newSeat);

        return newSeat;
    }
    
    public void Unreserve(int seatNumber) {
        this.reservedSeats.Remove(seatNumber);
        this.heap.Enqueue(seatNumber, seatNumber);
    }
}

/*
Data range/assumptions:
n: [1, 10^5]
reserver only called if seat available
*/

/*
Tests:
n = 1
n = max
unreserve middle seat and efficiently rereserver
lowest seat is low (e.g. 1)
lowest seat is middle (e.g. max//2)
lowest seat is high (e.g. max)
many unreservered seats
few unreserved seats
*/

/*
Ideas:

Naive:
    Linear traversal of set of available seats: O(n)
    Unreserve: O(1)

How to speed up reserve finding?
    minheap
*/

/*
Completion time (minutes): 
Question difficulty: 
How did it go (0 - 6): 
*/