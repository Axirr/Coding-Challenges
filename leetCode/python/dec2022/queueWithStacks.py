class MyQueue:

    def __init__(self):
        self.stack = []

    def push(self, x: int) -> None:
        self.stack.append(x)

    def pop(self) -> int:
        tempStack = []
        while len(self.stack) > 1:
            tempStack.append(self.stack.pop())
        returnValue = self.stack.pop()
        while len(tempStack) > 0:
            self.stack.append(tempStack.pop())
        return returnValue

    def peek(self) -> int:
        tempStack = []
        while len(self.stack) > 1:
            tempStack.append(self.stack.pop())
        returnValue = self.stack[-1]
        while len(tempStack) > 0:
            self.stack.append(tempStack.pop())
        return returnValue
        

    def empty(self) -> bool:
        return len(self.stack) == 0

def main():
    myQ = MyQueue()
    myQ.push(1)
    myQ.push(2)
    print(myQ.stack)
    print(myQ.peek())
    print(myQ.pop())
    print(myQ.stack)
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
'''