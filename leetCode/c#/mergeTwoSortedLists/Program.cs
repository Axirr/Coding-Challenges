using System;
using System.Diagnostics;
using System.Collections.Generic;

namespace MergeTwoSortedLists {
    class Program {
        public static void Main(string[] args) {
            Solution sol = new Solution();
            ListNode list1 = new ListNode();
            ListNode list2 = new ListNode();
            ListNode resultList = new ListNode();
            int[] initList = new int[] {};

            initList = new int[] { 1, 2, 4 };
            list1 = new ListNode(initList);
            initList = new int[] { 1, 3, 4 };
            list2 = new ListNode(initList);
            resultList = sol.MergeTwoLists(list1, list2);
            resultList.PrettyPrint();

            initList = new int[] { -9, 3 };
            list1 = new ListNode(initList);
            initList = new int[] { 5, 7 };
            list2 = new ListNode(initList);
            resultList = sol.MergeTwoLists(list1, list2);
            resultList.PrettyPrint();
        }
    }

    public class ListNode {
        public int val;
        public ListNode next;
        public ListNode(int val = 0, ListNode next=null) {
            this.val = val;
            this.next = next;
        }

        public ListNode(int[] dataArray) {
            this.val = dataArray[0];
            ListNode currentNode = this;
            for (int i = 1; i < dataArray.Length; i++) {
                currentNode.next = new ListNode(dataArray[i]);
                currentNode = currentNode.next;
            }
        }

        public void PrettyPrint() {
            ListNode currentListNode = this;
            while (currentListNode != null) {
                Console.WriteLine(currentListNode.val);
                currentListNode = currentListNode.next;
            }
        }
    }
    public class Solution {
        public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
            if (list1 == null) { return list2; }
            if (list2 == null) { return list1; }

            ListNode resultList = list1;
            ListNode currentList1 = list1.next;
            ListNode currentList2 = list2;
            if (list2.val < list1.val) { 
                resultList = list2;
                currentList1 = list1;
                currentList2 = list2.next;
            }
            ListNode resultListHead = resultList;

            while (currentList1 != null && currentList2 != null) {
                if (currentList1.val <= currentList2.val) {
                    resultList.next = currentList1;
                    resultList = resultList.next;
                    currentList1 = currentList1.next;
                } else {
                    resultList.next = currentList2;
                    resultList = resultList.next;
                    currentList2 = currentList2.next;
                }
            }

            while (currentList1 != null) {
                resultList.next = currentList1;
                resultList = resultList.next;
                currentList1 = currentList1.next;
            }

            while (currentList2 != null) {
                resultList.next = currentList2;
                resultList = resultList.next;
                currentList2 = currentList2.next;
            }

            return resultListHead;
        }
    }
}