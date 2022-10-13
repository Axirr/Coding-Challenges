class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        ListNode myListNode = new ListNode(5);
        myListNode.next = new ListNode(3);
        mySol.DeleteNode(myListNode);
    }
}

public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int x) { val = x; }
}

public class Solution {
    public void DeleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}

/*
Data range/assumptions:
Non-empty
Values of nodes unique
Node in list
Not not tail
*/

/*
Test cases:
2 node list
*/

/*
Ideas:

Traditional deletion not work
But can transpose the value of the next into the current and delete that one
    Since we have access to its prev and next to maintain linkage 
*/