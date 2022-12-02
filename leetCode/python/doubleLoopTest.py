from functools import wraps
import time
import random

def timeit(func):
    @wraps(func)
    def timeit_wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        total_time = end_time - start_time
        # print(f'Function {func.__name__}{args} {kwargs} Took {total_time:.4f} seconds')
        #print(f'Function {func.__name__} Took {total_time:.4f} seconds')
        return total_time
    return timeit_wrapper

@timeit
def doubleLoop(list1, list2):
    sum = 0
    for num in list1:
        sum += num
    for num in list2:
        sum += num
    # print(sum)

@timeit
def singleLoop(list1, list2):
    sum = 0
    for i in range(len(list1)):
        sum += list1[i]
        sum += list2[i]
    # print(sum)

list1 = []
list2 = []
random.seed()
for i in range(100000):
    list1.append(random.randrange(10000))
for i in range(100000):
    list2.append(random.randrange(10000))
numTries = 100
sumTime1 = 0
for i in range(numTries):
    sumTime1 += singleLoop(list1, list2)
print("AVERAGE %f" % (sumTime1/numTries))
sumTime2 = 0
for i in range(numTries):
    sumTime2 += doubleLoop(list1, list2)
print("AVERAGE %f" % (sumTime2/numTries))
difference = abs(sumTime1 - sumTime2)
minTime = min(sumTime1, sumTime2)
diffMargin = minTime * 0.1
if difference > diffMargin:
    if sumTime1 < sumTime2:
        print("DIFF. Single loop is faster.")
    else:
        print("DIFF. Double loop is faster.")
else:
    print("SAME. Difference within %f" % diffMargin)
print("Time difference is %f" % difference)
print("Percentage difference is %f%%" % (100 * difference / minTime))