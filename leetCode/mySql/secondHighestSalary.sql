# Write your MySQL query statement below

#select (select distinct salary from Employee order by salary desc limit 1 offset 1) as SecondHighestSalary;

select ifnull((select distinct salary from Employee order by salary desc limit 1 offset 1), null) as SecondHighestSalary;

# order by salary desc
# offset 1 limit 1