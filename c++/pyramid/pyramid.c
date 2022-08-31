#include <stdio.h>
#include <stdbool.h>

int main() {
    int numBlocks;
    scanf("%d", &numBlocks);
    int blockLayers[2000] = {0};
    //for (int i = 0; i < 2000; i++) {
    //    printf("%d\n", blockLayers[i]);
    //}
    blockLayers[0] = 1;
    int sumBlocks = 1;
    int layerNumber = 2;
    int newLayerValue;
    while (true) {
        newLayerValue = blockLayers[layerNumber - 2] + (layerNumber - 1) * 8;
        blockLayers[layerNumber - 1] = newLayerValue;
        sumBlocks += newLayerValue;
        if (sumBlocks >= numBlocks) {
            if (sumBlocks > numBlocks) {
                layerNumber -= 1;
            }
            break;
        }
        layerNumber += 1;
    }
    //printf("Sum of blocks is %d\n", sumBlocks);
    //printf("Array 1, 2, 3, is ..... %d %d %d\n", blockLayers[0],blockLayers[1], blockLayers[2]);
    printf("%d\n", layerNumber);

    return 0;
}

// 1    1
// 9    1
// 10   2
// 34   2
// 35   3