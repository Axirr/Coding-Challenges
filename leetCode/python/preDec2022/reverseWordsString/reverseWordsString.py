class Solution:
    def reverseWords(self, s: str) -> str:
        '''
        Assumptions/data range
            No empty string
            No leading space
        '''

        '''
        Test cases:
        Extreme values:
            Single word, single letter
            Long single word
            Many words
        Capital letters
        '''

        '''
        Plain language
        Naive:
            Iterate through string letter by letter
            If not space, construct temp word in forward direction
            When find space, reverse temp word and add to resultString
        
        Speedup:
            N traversal unavoidable
            So increase inside loop efficieny
            Try to remove
                currentWord, to reduce space complexity
                slicing to reduce time complexity
            In place would save memory and slicing
        
        Don't know length of words
        Split string into words
            Time complexity n?
        Reverse in place
        Strings immutable so in place not possible
        But surely time complexity possible to improve
            Avoid reverse slice operation?
                sum(leni) for all words
                Makes it more like 2n instead of n, assuming more letters than spaces
            Built strings backwards?
                Insert 0 has a cost though
        
        Idea: iterate through string backwards, making a list of words
        Join at end over spaces
        '''

        '''
        Simple test case manual runthrough
        s = "my words"
        currentWord
            m
            my
        resultString
            ym
            ym 
        currentWord = ""
            w
            wo
            wor
            word
            words
        break
        ym sdrow
        '''

        # resultString = ""
        wordList = [""]
        currentWordIndex = 0
        for i in range(len(s) - 1, -1, -1):
            letter = s[i]
            if letter == " ":
                currentWordIndex += 1
                wordList[currentWordIndex] = ""
                # resultString += letter
            else:
                wordList[currentWordIndex] += letter
        wordList = wordList[::-1]
        
        return " ".join(wordList)