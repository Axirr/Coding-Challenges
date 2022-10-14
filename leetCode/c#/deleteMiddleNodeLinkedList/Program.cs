class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        ListNode myListNode = new ListNode(5);
        ListNode secondListNode = new ListNode(13);
        myListNode.next = secondListNode;
        ListNode thirdListNode = new ListNode(-10);
        secondListNode.next = thirdListNode;
        ListNode currentNode = myListNode;
        while (currentNode != null) {
            Console.WriteLine(currentNode.val);
            currentNode = currentNode.next;
        }
        mySol.DeleteMiddle(myListNode);
        currentNode = myListNode;
        while (currentNode != null) {
            Console.WriteLine(currentNode.val);
            currentNode = currentNode.next;
        }
    }
}


public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val=0, ListNode next=null) {
        this.val = val;
        this.next = next;
    }
}


public class Solution {
    public ListNode DeleteMiddle(ListNode head) {
        if (head.next == null) { return null; }

        int count = 0;
        int batchSize = 100;
        ListNode currentNode = head;
        ListNode oldShortcut = null;
        ListNode currentShortcut = null;
        int currentShortcutCount = Int32.MaxValue;
        int oldShortcutCount = Int32.MaxValue;


        while (currentNode != null) {
            for (int i = 0; i < batchSize; i++) {
                if (currentNode == null) { break;  }
                count += 1;
                currentNode = currentNode.next;
            }
            if (currentNode == null) { break;  }
            oldShortcut = currentShortcut;
            oldShortcutCount = currentShortcutCount;
            currentShortcut = currentNode;

            // Unsure about batchsize
            // Should it even change? By how much
            batchSize *= 4;
        }

        int middleIndex = count / 2;
        count = 0;
        if (currentShortcut != null & currentShortcutCount < middleIndex) {
            currentNode = currentShortcut;
        } else if (oldShortcut != null & oldShortcutCount < middleIndex) {
            currentNode = oldShortcut;
        } else {  currentNode = head;  }

        ListNode prevNode = new ListNode(-1);
        while (currentNode != null) {
            if (count == middleIndex) {
                prevNode.next = currentNode.next;
                break;
            }
            count += 1;
            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        return head;
    }
}

/*
Data range/assumptions:
Non-empty
Large number of nodes
*/

/*
Test cases:
Single node list/deletes head
    Deletes itself?
*/

/*
Ideas

Naive:
    Traverse to find length
    Calculate delete index
    Traverse until get there, maintaining previous
    Time complexity: 2n
        Reasonable

Better ideas:
    Maintain an entry point closer to the middle
        Two entry points:
            Old middle:
            Potential new middle
            When newMiddle becomes valid middle, change it to oldMiddle
            new newMiddle can be halfway between oldMiddle and end?
        Single entry point:
            Always underestimate
            Only take entry point when guaranteed to at least be the middle or in front
        Only start looking for entry points after a certain length, to avoid unncessary conditionals for short lists
            100?
            Then set middle to 50
*/