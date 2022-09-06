import random

dataRange = 200000
print("%i " % (dataRange), end='')
print("1")
for i in range(dataRange):
	randNum = random.randrange(0, dataRange)
	if (i < (dataRange - 1)):
		print("%i " % randNum, end='')
	else:
		print("%i" % randNum, end='')
