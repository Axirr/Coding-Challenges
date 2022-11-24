# Write your MySQL query statement below

select distinct employee_id from (select employee_id from Employees A
union
select employee_id from Salaries B) as Z where Z.employee_id not in (select E.employee_id from Employees E inner join Salaries T on E.employee_id = T.employee_id) order by employee_id asc;