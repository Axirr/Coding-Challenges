# Write your MySQL query statement below

select Department, K.name as Employee, Z.salary as Salary 
from (
    select D.name as Department, D.id, E.salary, row_number() over (partition by D.id order by E.salary desc) as salary_rank 
    from department D
    inner join (select distinct departmentId, salary 
                from employee) as E
    on D.id = E.departmentId) as Z
left join Employee K
on Z.salary = K.salary and Z.id = K.departmentId
where Z.salary_rank <= 3;