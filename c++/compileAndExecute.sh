gcc -Wall -Wextra $1;
returnCode=$(($?+0));
if [ $returnCode != 0 ]
	then
	echo "Compilation failed";
	exit;
fi
./a.out;
