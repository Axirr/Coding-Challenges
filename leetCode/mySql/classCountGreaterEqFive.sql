# Write your MySQL query statement below

select class from (select class, count(*) as myCount from Courses group by class) as T where myCount >= 5;

# group by class
# count
# where count >= 5