from typing import List
from collections import deque

class Solution:
    def closestMeetingNode(self, edges: List[int], node1: int, node2: int) -> int:
        nodes = [node1, node2]
        newNodes = [None, None]
        visited = []
        visited.append(set())
        visited.append(set())

        globalVisited = set()

        resultNode = None
        while nodes[0] is not None or nodes[1] is not None:
            for i in range(2):
                currentNode = nodes[i]
                if currentNode is None or currentNode in visited[i]:
                    continue
                visited[i].add(currentNode)
                if edges[currentNode] != -1 and edges[currentNode] not in visited[i]:
                    newNodes[i] = edges[currentNode]
                if currentNode in globalVisited:
                    if not resultNode is None:
                        resultNode = min(resultNode,currentNode)
                    else:
                        resultNode = currentNode
                globalVisited.add(currentNode)
            
            if not resultNode is None:  return resultNode
            
            nodes = newNodes
            newNodes = [None, None]
        return -1

def main():
    sol = Solution()
    edges = [5,-1,3,4,5,6,-1,-1,4,3]
    node1 = 0
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