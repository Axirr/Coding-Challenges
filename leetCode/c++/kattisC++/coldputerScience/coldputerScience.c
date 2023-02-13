#include <stdio.h>

int main() {
	int numValues;
	int readNum;
	int belowZeroCount = 0;

	scanf("%d", &numValues);

	for (int i = numValues; i > 0; i--) {
		scanf("%d", &readNum);
		if (readNum < 0) {
			belowZeroCount++;
		}
	}
	printf("%d",belowZeroCount);

    return 0;
}
