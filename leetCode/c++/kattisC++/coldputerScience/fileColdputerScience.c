#include <stdio.h>

int main(int argc, char *argv[]) {
	FILE *fp;
	int numValues;
	int readNum;
	int belowZeroCount = 0;

	if (argc != 2) {
		printf("Number of arguments is ");
		printf("%d", argc);
		printf(" and it should be 2");
    	printf("\n");
		return 1;
	}
	
	fp = fopen(argv[1], "r");
	if (!fp) {
		printf("File opening failed.\n");
		return 1;
	}

	fscanf(fp, "%d", &numValues);
	//printf("The number of values is %d\n", numValues);

	for (int i = numValues; i > 0; i--) {
		fscanf(fp, "%d", &readNum);
		if (readNum < 0) {
			belowZeroCount++;
		}
		//printf("%d\n", readNum);
	}
	printf("%d",belowZeroCount);

	int closeValue = fclose(fp);
	if (closeValue != 0) {
		printf("File close error\n");
	} else {
		//printf("File successfully closed\n");
	}

    return 0;
}
