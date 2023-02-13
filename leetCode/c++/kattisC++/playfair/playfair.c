#include <stdio.h>
#include <stdbool.h>
#include <string.h>

static int KEYPHRASE_MAX_LENGTH = 1001;
static bool VERBOSE = false;

void playfairPrettyPrint(char* cipherTable);
bool areSameColumn(char firstChar, char secondChar, char* cipherTable);
bool areSameRow(char firstChar, char secondChar, char* cipherTable);
int newIndexCol(int oldIndex);
int newIndexRow(int oldIndex);
int newIndexNoMatch(int ownRow, int otherCol);
int getCol(char* cipherTable, char keyChar);
int getRow(char* cipherTable, char keyChar);

int main() {
    char cipherTable[26];
    memset(cipherTable, '\0', 26);

    char keyPhrase[KEYPHRASE_MAX_LENGTH];

    int buffer;
    int i = 0;
    char convertedChar;
    while (true) {
        buffer = getc(stdin);
        if (buffer == -1) { break; }
        convertedChar = (char) buffer;
        if (convertedChar == '\n') {
            keyPhrase[i] = '\0';
            break;
        }
        keyPhrase[i] = convertedChar;
        i++;
    }

    if (VERBOSE) {
        printf("Parsed key phrase is %s\n", keyPhrase);
    }

    char* searchReturn;
    int cipherIndex = 0;
    for (int i = 0; i < KEYPHRASE_MAX_LENGTH; i++) {
        char potentialChar = keyPhrase[i];
        if (potentialChar == '\0') { break ; }
        if (potentialChar == ' ' || potentialChar == 'q') { continue; }
        searchReturn = strchr(cipherTable, potentialChar);
        if (searchReturn == NULL) {
            cipherTable[cipherIndex] = potentialChar;
            cipherIndex++;
        }
    }

    char* limitedAlpha = "abcdefghijklmnoprstuvwxyz";

    cipherTable[cipherIndex] = '\0';

    char lettersToAdd[26] = "";
    int letterIndex = 0;
    for (int i = 0; i < 25; i++) {
        char potentialChar = limitedAlpha[i];
        searchReturn = strchr(cipherTable, potentialChar);
        if (searchReturn == NULL) {
            lettersToAdd[letterIndex] = potentialChar;
            letterIndex++;
        }
    }

    for (int i = 0; i < letterIndex; i++) {
        cipherTable[cipherIndex] = lettersToAdd[i];
        cipherIndex++;
    }

    if (VERBOSE) {
        playfairPrettyPrint(cipherTable);
    }

    cipherTable[cipherIndex] = '\0';

    char message[1001];
    // KATTIS WAS POSSIBLY HAVING ISSUES WITH USING GETLINE
    // getline(&message, &len, stdin);
    // char* statusCode = fgets(message, 1000, stdin);
    // if (statusCode == NULL) {
    //     printf("Error null character\n");
    // }
    scanf("%[^\n]s",message);
    char cleanedString[2001];
    int cleanIndex = 0;
    int count = 0;
    for (int i =0; i < 1001; i++) {
        if (message[i] == '\0') {
            break;
        }
        char potentialChar = message[i];
        if (potentialChar != ' ') {
            if (count == 0) {
                count = 1;
            } else {
                if (cleanIndex > 0) {
                    if (cleanedString[cleanIndex - 1] == potentialChar) {
                        cleanedString[cleanIndex] = 'x';
                        cleanIndex++;
                    } else {
                        count = 0;
                    }
                }
            }
            cleanedString[cleanIndex] = potentialChar;
            cleanIndex++;
        }
    }
    if (cleanIndex % 2 == 1) {
        cleanedString[cleanIndex] = 'x';
        cleanIndex++;
    } else {
        if (VERBOSE) {
            printf("%s\n", "no need to add extra, length of string is even");
        }
    }
    cleanedString[cleanIndex] = '\0';

    if (VERBOSE) {
        printf("%s\n", cleanedString);
    }

    i = 0;
    char resultString[2001];
    int resultStringIndex = 0;
    int tempIndex;
    while (true) {
        char firstChar = cleanedString[i];
        if (firstChar == '\0') {
            break;
        }
        char secondChar = cleanedString[i+1];
        if (areSameColumn(firstChar, secondChar, cipherTable)) {
            searchReturn = strchr(cipherTable, (int) firstChar);
            tempIndex = searchReturn - cipherTable;
            resultString[resultStringIndex] = cipherTable[newIndexCol(tempIndex)] - 32;
            searchReturn = strchr(cipherTable, (int) secondChar);
            tempIndex = searchReturn - cipherTable;
            resultString[resultStringIndex + 1] = cipherTable[newIndexCol(tempIndex)] - 32;
        } else if (areSameRow(firstChar, secondChar, cipherTable)) {
            searchReturn = strchr(cipherTable, (int) firstChar);
            tempIndex = searchReturn - cipherTable;
            resultString[resultStringIndex] = cipherTable[newIndexRow(tempIndex)] - 32;
            searchReturn = strchr(cipherTable, (int) secondChar);
            tempIndex = searchReturn - cipherTable;
            resultString[resultStringIndex + 1] = cipherTable[newIndexRow(tempIndex)] - 32;
        } else {
            searchReturn = strchr(cipherTable, (int) firstChar);
            resultString[resultStringIndex] = cipherTable[newIndexNoMatch(getRow(cipherTable, firstChar), getCol(cipherTable, secondChar))] - 32;
            searchReturn = strchr(cipherTable, (int) secondChar);
            resultString[resultStringIndex + 1] = cipherTable[newIndexNoMatch(getRow(cipherTable, secondChar), getCol(cipherTable, firstChar))] - 32;

        }
        resultStringIndex += 2;
        i += 2;
    }

    resultString[resultStringIndex] = '\0';
    printf("%s\n", resultString);

    return 0;
}



void playfairPrettyPrint(char* cipherTable) {
    for (int i = 0; i < 25; i++) {
        printf("%c", cipherTable[i]);
        if ((i + 1) % 5 == 0) { printf("%c", '\n'); }
    }
}

bool areSameColumn(char firstChar, char secondChar, char* cipherTable) {
    int firstCol;
    int secondCol;
    firstCol = getCol(cipherTable, firstChar);
    secondCol = getCol(cipherTable, secondChar);

    // if (VERBOSE) {
    if (false) {
        printf("First char: %c\n", firstChar);
        printf("First col: %d\n", firstCol + 1);
        printf("Second char: %c\n", secondChar);
        printf("Second col: %d\n", secondCol + 1);
    }
    return firstCol == secondCol;
}

int getCol(char* cipherTable, char keyChar) {
    int col;
    char* searchReturn = strchr(cipherTable, (int) keyChar);
    col = (searchReturn - cipherTable) % 5;
    return col;
}

int getRow(char* cipherTable, char keyChar) {
    int row;
    char* searchReturn = strchr(cipherTable, (int) keyChar);
    row = (searchReturn - cipherTable) / 5;
    return row;
}

bool areSameRow(char firstChar, char secondChar, char* cipherTable) {
    int firstRow;
    int secondRow;
    firstRow = getRow(cipherTable, firstChar);
    secondRow = getRow(cipherTable, secondChar);

    // if (VERBOSE) {
    if (false) {
        printf("First char: %c\n", firstChar);
        printf("First row: %d\n", firstRow + 1);
        printf("Second char: %c\n", secondChar);
        printf("Second row: %d\n", secondRow + 1);
    }
    return firstRow == secondRow;
}

int newIndexCol(int oldIndex) {
    int newIndex = oldIndex + 5;
    if (newIndex > 24) {
        newIndex = newIndex % 25;
    }
    return newIndex;
}
 int newIndexRow(int oldIndex) {
    int newIndex;
    if ((oldIndex + 1) % 5 != 0) {
        newIndex = oldIndex + 1;
    } else {
        newIndex = oldIndex - 4;
    }
    return newIndex;
 }

int newIndexNoMatch(int ownRow, int otherCol) {
    int newIndex = ownRow * 5 + otherCol;
    return newIndex;
}