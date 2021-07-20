#include <iostream>
#include <algorithm>
#include <map>

using namespace std;

int main() {
    int numFish;
    int numMongers;
    cin >> numFish;
    cin >> numMongers;
    int* fishWeights = new int[numFish];
    map<int,int> fishMongers;
    int tempFishWeight;
    int fishCounter = 0;
    for (int i = 0; i < numFish; i++) {
        cin >> tempFishWeight;
        fishWeights[fishCounter] = tempFishWeight;
        fishCounter += 1;
    }
    sort(fishWeights, fishWeights+numFish,greater<int>());
    //for (int i = 0; i < fishCounter; i++) {
    //    cout << fishWeights[i] << "\n";
    //}
    int tempMongerNumber;
    int tempMongerValue;
    for (int i = 0; i < numMongers; i++) {
        cin >> tempMongerNumber;
        cin >> tempMongerValue;
        //cout << tempMongerValue << "\n";
        //cout << tempMongerNumber << "\n";
        fishMongers.insert(pair<int,int>(tempMongerValue,tempMongerNumber));
    }
    cout << "Current size " << fishMongers.size() << "\n";
    int totalValue = 0;
    int completedFish = 0;
    //for (auto it = fishMongers.rbegin(); it != fishMongers.rend(); it++) {
    //    cout << it->first << "\n";
    //}
    for (auto it = fishMongers.rbegin(); it != fishMongers.rend(); it++) {
        cout << "iterator second" << " " << it->second << "\n";
        cout << "number of fish" << " " << numFish << "\n";
        while (it->second > 0 && numFish > 0) {
            int tempWeight = fishWeights[completedFish];
            int toAdd = it->first*tempWeight;
            cout << toAdd << "\n";
            totalValue += it->first*tempWeight;
            numFish -= 1;
            it->second -= 1;
            completedFish += 1;
        }
        if (numFish <= 0) { break; }
        //cout << it->first << " " << it->second << "\n";
    }
    cout << totalValue;
    delete fishWeights;
}
