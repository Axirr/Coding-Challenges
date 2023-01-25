from typing import List
from collections import deque

class Solution:
    def closestMeetingNode(self, edges: List[int], node1: int, node2: int) -> int:
        # if edges[node1] == node2 or edges[node2] == node1:
        #     return node1

        queueNode1 = deque()
        queueNode1.append(node1)
        newQueue1 = deque()
        visited1 = set()

        queueNode2 = deque()
        queueNode2.append(node2)
        newQueue2 = deque()
        visited2 = set()

        globalVisited = set()

        currentSteps = 0
        resultNode = None
        while True:
            intersectionNode = self.exploreLevel(queueNode1, visited1, globalVisited, newQueue1, edges)
            if not intersectionNode is None:
                resultNode = intersectionNode
            intersectionNode = self.exploreLevel(queueNode2, visited2, globalVisited, newQueue2, edges)
            if not intersectionNode is None:
                if not resultNode is None:
                    resultNode = min(resultNode, intersectionNode)
                else:  resultNode = intersectionNode
            
            if not resultNode is None:  return resultNode
            
            if not newQueue1 and not newQueue2:
                return -1
            else:
                queueNode1 = newQueue1
                queueNode2 = newQueue2
                newQueue1 = deque()
                newQueue2 = deque()
                currentSteps += 1
    
    def exploreLevel(self, queue, visited, globalVisited, newFrontier, edges):
        while queue:
            currentNode = queue.pop()
            while currentNode in visited and len(queue) > 0:
                currentNode = queue.pop()
            if currentNode in visited:
                return None
            if currentNode in globalVisited:
                return currentNode
            visited.add(currentNode)
            globalVisited.add(currentNode)
            if edges[currentNode] != -1 and edges[currentNode] not in visited:
                newFrontier.append(edges[currentNode])
        return None

def main():
    sol = Solution()
    edges = [2,0,0]
    node1 = 2
    node2 = 0
    result = sol.closestMeetingNode(edges, node1, node2)
    print(result)
    assert result == 0
    edges = [4,4,8,-1,9,8,4,4,1,1]
    node1 = 5
    node2 = 6
    result = sol.closestMeetingNode(edges, node1, node2)
    print(result)
    assert result == 1
    edges = [1,2,-1]
    node1 = 0
    node2 = 2
    result = sol.closestMeetingNode(edges, node1, node2)
    print(result)
    assert result == 2
    edges = [2,2,3,-1]
    node1 = 0
    node2 = 1
    result = sol.closestMeetingNode(edges, node1, node2)
    print(result)
    assert result == 2

main()

'''
Data range/assumptions:
n: [2, 10^5]
edge vales: [-1, n]
node1 and node 2: [0, n - 1]
nodes have max one outgoing edge
'''

'''
Tests:
n = 2
n = 10^5
not possible
one of targets has not edges
'''

'''
Ideas:

Naive:
    Calculate distance from node1 to all nodes
    Calculate distance from node2 to all nodes
    Of the nodes in the intersection, sum them and take the minimum

Better: answer must be on a path from node1 to node2
    Could be a lot of paths though

BFS from each node until they contain the same node?
    Guarantees optimality?
        We want the paths to be equal, since that minimizes the max
            E.g. for a path with distance k, the node in the middle (~k // 2 from each) is best
    BFS time complexity:
        Searches each node once at most
        O(n)
    Determining if both have visited a node
        If have a global set, in addition to individual sets, can detect the first time a node is double used
            Should be 2n * O(1) -> O(n)

Seems promising, will check solution to see if vaguely correct
BFS is mentioned

BFS implementation:
    queue
    newQueue
    visited
    keep track of current distance travelled
    if not in visited, add any it borders to newQueue
    when old queue is exhausted, queue = newQueue
'''