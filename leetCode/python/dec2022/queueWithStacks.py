class MyQueue:

    def __init__(self):
        self.inputStack = []
        self.correctStack = []
        self.correctOrderToLen = 0

    def push(self, x: int) -> None:
        self.inputStack.append(x)

    def pop(self) -> int:
        if len(self.correctStack) == 0:
            while len(self.inputStack) > 0:
                self.correctStack.append(self.inputStack.pop())
        return self.correctStack.pop()

    def peek(self) -> int:
        if len(self.correctStack) == 0:
            while len(self.inputStack) > 0:
                self.correctStack.append(self.inputStack.pop())
        return self.correctStack[-1]

    def empty(self) -> bool:
        return len(self.inputStack) == 0 and len(self.correctStack) == 0

def main():
    myQ = MyQueue()
    myQ.push(1)
    myQ.push(2)
    print(myQ.inputStack)
    print(myQ.peek())
    print(myQ.pop())
    print(myQ.correctStack)
    print(myQ.empty())

main()

'''
Data range/assumptions:
Values: [1,9]
100 calls, all valid
'''

'''
Tests:
Add item
DOuble add item
Pop item
Double pop item
Peek
Empty
'''

'''
Ideas:

Naive:
    Two lists
    When need item, move all but first item to other
    Ugly

Better: maintain a next item?
    Run into the same problem when updating item though

Setup so last item in the stack is "first"
Push would be the complicated one
Create new stack, push new to that, then push old stack to it?
    That push is still O(n) using stack operations

Separate add stack and take stack
When take runs out, 

Two stack method:
push 1 2 3 4
    top 1 bottom
    top null bottom

    1
    2

    1 3
    2

Top of stack is wrong order, but lower isn't?
    Every, for e.g., 5 items, we reverse the last 5
    Then peak, pop, and empty take worst case O(5)
    And append is O(1) most of the time and O(5) occasionally
    Isn't this spreading the bad out and it will take the same time in aggregate
'''