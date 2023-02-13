#include <stdio.h>
#include <stdbool.h>

int main() {
	char currentChar;
	int currentAddress = 0;

	bool partial = false;
	int startingAddress;
	while( (currentChar = getc(stdin)) != -1 ) {
		//printf("%c\n", currentChar);
		if (partial) {
			if (currentChar != '-') {
				if (currentChar == ')') {
					printf("%d\n", startingAddress);
				}
				partial = false;
				startingAddress = -1;
			}
		}
		if (currentChar == ':' || currentChar == ';') {
			startingAddress = currentAddress;
			partial = true;
		}
		currentAddress++;
	}
	return 0;
}
