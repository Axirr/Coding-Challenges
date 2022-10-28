# Please write a DELETE statement and DO NOT write a SELECT statement.
# Write your MySQL query statement below

# group by email
# find min id
# delete if not in that group

delete from Person where id not in (select * from (select min(id) as id from Person group by email) as T);