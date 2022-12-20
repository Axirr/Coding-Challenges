from typing import List

class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        frontier = set([0])
        potentialRooms = set()
        for i in range(1, len(rooms)):
            potentialRooms.add(i)
        while len(frontier) > 0 and len(potentialRooms) > 0:
            newKeys = rooms[frontier.pop()]
            for key in newKeys:
                if key in potentialRooms:
                    potentialRooms.remove(key)
                    frontier.add(key)
        for leftoverRoom in potentialRooms:
            if not leftoverRoom in frontier:
                return False
        return True


def main():
    sol = Solution()
    rooms = [[1],[2],[3],[]]
    canVisit = sol.canVisitAllRooms(rooms)
    print(canVisit)
    assert canVisit == True
    rooms = [[1,3],[3,0,1],[2],[0]]
    canVisit = sol.canVisitAllRooms(rooms)
    print(canVisit)
    assert canVisit == False

main()

'''
Data range/assumptions:
Number of rooms: [2, 1000]
Keys in rooms: [0, 1000] but <= n
Max keys in rooms: 3000
'''

'''
Tests:
2 rooms
1000 rooms
Rooms have many duplicate keys
Can't visit all because of lack of link to room with right keys, not lack of keys
Lack of keys fail
'''

'''
Ideas:

Naive:
    Frontier set of rooms to visit
    Set of potential rooms
    while frontier and potential:
        search room in frontier
        for keys in room
            if in potential:
                add to frontier
                remove from potential
    return len(potentialRooms) == 0

    Time complexity:
    Search each room max of once: n
    Construct potential rooms: n
    O(n)?
    
    Sanity check:
        Can construct potential, using len list
        Only have to visit room max once
        Removing from potential lets us not unnecessarily search rooms
            If we could search all, then the problem is solved
'''