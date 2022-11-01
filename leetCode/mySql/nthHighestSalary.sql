CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
declare i int;
set i = N - 1;
  RETURN (
      select ifnull((select distinct salary from Employee order by salary desc limit 1 offset i), null) as SecondHighestSalary      
  );
END