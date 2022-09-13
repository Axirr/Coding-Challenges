import sys

'''
IT's ABOUT PAIRS, not all possible combos
    Find a split pair that the opponent can't win on either of (since they get their choice)
Algorithm:
Decision tree
Collapse single own decisions to one that only has guaranteed wins?
Include all decisions of other
Build tree from base up, keeping guaranteed winner of each tree
Chop 2 -> win
Chop 3 -> lose
Chop 4 -> win, since leads to chop 2
Chop 5 -> 
Naive:
Permutations of chops
Fully expand down
Then work way back up, solving each node (given solved nodes below)
With caching, since nodes will often be repeated

Intuitions:
Two different guaranteed losing conditions
    Being forced to cut a board with one of the results being two
        Opponent chooses that one, cuts, only ones are left
'''

alwaysWinsSolutionCache = {}
neverWinSolutionCache = {}

def main():
    tempList = sys.stdin.readline().rstrip('\n').split(" ")
    nDim = int(tempList[0])
    mDim = int(tempList[1])
    myBoard = Board(nDim, mDim)
    # boardSplits(myBoard)
    tree = buildTree(myBoard)
    tree.printWholeTree()
    isSelfWin = solveTreeAlwaysWin(tree)
    if (isSelfWin):
        print("A")
    else:
        print("B")

def solveTreeAlwaysWin(tree):
    isSelfWin = True
    treeKey = tree.__repr__()
    print(tree)
    if(False):
    # BUG IMPLEMENT CACHING
    # if (treeKey in alwaysWinsSolutionCache.keys()):
        return alwaysWinsSolutionCache[treeKey]
    else:
        if (len(tree.children) == 0):
            isSelfWin = False
            print("\n")
            # print("Auto lose, 1 x 1")
            # print(tree)
        else:
            for child in tree.children:
                # Need a pair of children to be neverWin because opponent picks
                if (not solveTreeAlwaysWin(child)):
                    nameString = "Ann"
                    if (not tree.isAnn): nameString = "Ber"
                    print("Child found to disprove always win for %s" % nameString)
                    print(child)
                    isSelfWin = False
                    break
        alwaysWinsSolutionCache[treeKey] = isSelfWin
    return isSelfWin

def solveTreeNeverWin(tree):
    neverWin = True
    treeKey = tree.__repr__()
    # BUG IMPLEMENT CACHING
    if (False):
    # if (treeKey in neverWinSolutionCache.keys()):
        return neverWinSolutionCache[treeKey]
    else:
        if (len(tree.children) > 0):
            for child in tree.children:
                # Need one child where opponent doesn't always win
                if (not solveTreeAlwaysWin(child)):
                    neverWin = False
                    print("Child found to disprove never win")
                    print(child)
                    break
        neverWinSolutionCache[treeKey] = neverWin
    return neverWin

class Tree:
    def __init__(self, board, isAnn, parent):
        self.board = board
        self.isAnn = isAnn
        self.parent = parent
        self.childPairs = []
    
    def buildChildren(self):
        potentialBoards = boardSplits(self.board)
        for newBoard in potentialBoards:
            newChild = Tree(newBoard, not self.isAnn, self)
            self.children.append(newChild)
    
    def printWholeTree(self, level=0):
        # print("Level %d" % level)
        print("\t" * level, end='')
        print(self.__str__())
        for child in self.children:
            child.printWholeTree(level + 1)

    def __str__(self):
        returnString = "Own Board: "
        returnString += self.board.__str__()
        if (self.isAnn):
            returnString += "    Player: Ann"
        else:
            returnString += "    Player: Ber"
        returnString += "    Num Children %d" % len(self.children)
        return returnString
    
    def __repr__(self):
        returnString = ""
        returnString += self.board.__str__()
        return returnString

class Board:
    def __init__(self, x, y):
        if (x > y):
            self.largeDim = x
            self.smallDim = y
        else:
            self.largeDim = y
            self.smallDim = x
    
    def __str__(self):
        return ("%d x %d" % (self.smallDim, self.largeDim))
    
    def __eq__(self, other):
        if (self.smallDim == other.smallDim and self.largeDim == other.largeDim):
            return True
        else:
            return False

def buildTree(board, isAnn=True):
    originalTree = Tree(board, isAnn, None)
    originalTree.buildChildren()
    treeList = []
    for child in originalTree.children:
        treeList.append(child)
    while (len(treeList) > 0):
        currentTree = treeList.pop()
        currentTree.buildChildren()
        for child in currentTree.children:
            treeList.append(child)
    return originalTree

def boardSplits(board):
    potentialBoards = []
    potentialBoards = partialBoards(board.smallDim, board.largeDim) + \
        partialBoards(board.largeDim, board.smallDim)
    tempBoards = []
    for board in potentialBoards:
        doAdd = True
        for secondBoard in tempBoards:
            if board.__eq__(secondBoard):
                doAdd = False
                break
        if doAdd:
            tempBoards.append(board)
    potentialBoards = tempBoards
    # for board in potentialBoards:
    #     print(board)
    return potentialBoards

def partialBoards(changeDim, sameDim):
    potentialBoards = []
    if (changeDim == 1):
        return potentialBoards
    for i in range(changeDim - 1, 0, -1):
        newBoard = Board(i, sameDim)
        potentialBoards.append(newBoard)
    return potentialBoards

main()

'''
Test Cases:
2 x 1 -> A
'''