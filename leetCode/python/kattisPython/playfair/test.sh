OUTPUT=$(python3 playfair.py < 1input.txt | tail -1);
if [[ $OUTPUT == "BMNDZBXDKYBEJVDMUIXMMNUVIF" ]]; then
    echo "1 passed!"
else
    echo "Test 1 FAILED"
fi
OUTPUT=$(python3 playfair.py < 2input.txt | tail -1);
if [[ $OUTPUT == "YDVHCWSPKNTAHKUBIPERMHGHDVRU" ]]; then
    echo "2 passed!"
else
    echo "Test 2 FAILED"
fi
OUTPUT=$(python3 playfair.py < 3input.txt | tail -1);
if [[ $OUTPUT == "SF" ]]; then
    echo "3 passed!"
else
    echo "Test 3 FAILED"
fi
OUTPUT=$(python3 playfair.py < 4input.txt | tail -1);
if [[ $OUTPUT == "XB" ]]; then
    echo "4 passed!"
else
    echo "Test 4 FAILED"
fi
OUTPUT=$(python3 playfair.py < 5input.txt | tail -1);
if [[ $OUTPUT == "BCDA" ]]; then
    echo "5 passed!"
else
    echo "Test 5 FAILED"
fi
OUTPUT=$(python3 playfair.py < 6input.txt | tail -1);
if [[ $OUTPUT == "BCDA" ]]; then
    echo "6 passed!"
else
    echo "Test 6 FAILED"
fi
OUTPUT=$(python3 playfair.py < 7input.txt | tail -1);
if [[ $OUTPUT == "JCMWMK" ]]; then
    echo "7 passed!"
else
    echo "Test 7 FAILED"
fi
OUTPUT=$(python3 playfair.py < 8input.txt | tail -1);
if [[ $OUTPUT == "DFMWMWMI" ]]; then
    echo "8 passed!"
else
    echo "Test 8 FAILED"
fi
OUTPUT=$(python3 playfair.py < 9input.txt | tail -1);
if [[ $OUTPUT == "UT" ]]; then
    echo "9 passed!"
else
    echo "Test 9 FAILED"
fi
OUTPUT=$(python3 playfair.py < 10input.txt | tail -1);
if [[ $OUTPUT == "LP" ]]; then
    echo "10 passed!"
else
    echo "Test 10 FAILED"
fi
OUTPUT=$(python3 playfair.py < 11input.txt | tail -1);
if [[ $OUTPUT == "MF" ]]; then
    echo "11 passed!"
else
    echo "Test 11 FAILED"
fi
OUTPUT=$(python3 playfair.py < 12input.txt | tail -1);
if [[ $OUTPUT == "YRYRRUOROR" ]]; then
    echo "12 passed!"
else
    echo "Test 12 FAILED"
fi
OUTPUT=$(python3 playfair.py < 13input.txt | tail -1);
if [[ $OUTPUT == "GZ" ]]; then
    echo "13 passed!"
else
    echo "Test 13 FAILED"
fi
OUTPUT=$(python3 playfair.py < 14input.txt | tail -1);
if [[ $OUTPUT == "OD" ]]; then
    echo "14 passed!"
else
    echo "Test 14 FAILED"
fi
OUTPUT=$(python3 playfair.py < 15input.txt | tail -1);
if [[ $OUTPUT == "ZH" ]]; then
    echo "15 passed!"
else
    echo "Test 15 FAILED"
fi
OUTPUT=$(python3 playfair.py < 16input.txt | tail -1);
if [[ $OUTPUT == "TD" ]]; then
    echo "16 passed!"
else
    echo "Test 16 FAILED"
fi