gcc $1;
returnCode=$(($?+0));
echo "returnCode is $returnCode";
if [ $returnCode != 0 ]
	then
	echo "Compilation failed";
	exit;
fi
./a.out;
