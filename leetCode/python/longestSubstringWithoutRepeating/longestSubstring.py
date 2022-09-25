import string

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        '''
        Data range/assumptions
        Strings can be 0
        Strings can be very long
        '''

        '''
        Test cases
        Empty string
        Single character
        No duplicates -> whole string
        Duplicate letters are first and last
        '''

        '''
        Plain language:
        Strings this long, naive n^2 isn't going to do it
        Dynamic programming
            Halving doesn't work?
                Because sum of substring halves might not be right
                E.g. "
            Extend by 1?
                substring(start, finish + 1) = substring(start, finish) + substring(finsish, finish + 1)
        Count dictionary?
            But then we know not valid, but where to break
                E.g. abcdefgha would only be shorted by 1, but bcdefghaa would use the front
        Recursive:
            Basic case: single letter, whole thing
            Extend left and right?
        Cases when duplicate found
            Include original, duplicate + 1 now one boundary
            Include duplicate, original - 1 now one boundary
        But what of case like 123456788988....
            If we started on 9, we would find duplicates both directions
            But longest would be the start part
        So can't just start in middle
        Have to do all n letters, extending until we find a duplicate
            Worst case: duplicates are front and back, so everything extends n -> n ^ 2
        Traverse string counting duplicates, keeping index
            Construct span for each letter, duplicate to duplicate
            Each one of those is a conditon that needs to be met if in relevant index range
                E.g. is [i, j] a valid substring
                    Yes if not duplicate a, b, c...
                if startRange in [i,j] and endRange in [i,j]
                    that's a duplicate
                Starting with big range is bad idea
                    E.g. if can't find a 2 ranger, obviously can't find a 2+ ranger
                But incrementing bad too
                    Binary mid?
                    If half not possible
                        Possible range: [half - 1, 1]
                    If half possible:
                        Possible range: [all, half + 1]
                    Search mid of possible range, cut range down accordingly
            Keep track of minLength of all characters
                That's maximum length, shouldn't start past that
        Worst case here
            All duplicates -> spans same length as string
        '''

        if s == "":     return ""

        currentIndex = [-1] * 26
        validChars = list(string.ascii_letters + string.digits + string.punctuation)
        for i in range(len(s)):
            letter = s[i]
            letterIndex = validChars.indexof(letter)

