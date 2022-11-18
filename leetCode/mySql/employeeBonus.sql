# Write your MySQL query statement below

select employee_id, if(mod(employee_id, 2) = 1 and not substring(name, 1, 1) = 'M', salary, 0) as bonus from Employees order by employee_id;