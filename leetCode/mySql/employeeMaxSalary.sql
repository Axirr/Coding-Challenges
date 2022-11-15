# Write your MySQL query statement below

# select D.name as Department, E.name as Employee, E.salary as Salary, max(E.salary) as MyMax from Department D left join Employee E on D.id = E.departmentId group by D.id;

select D.name as Department, Employee, Salary
from Department D right join 
    (select E.name as Employee, E.departmentId as deptId, E.Salary as Salary
    from Employee E right join 
        (select departmentId, max(salary) as DeptMax 
        from Employee group by departmentId) as T 
    on E.departmentId = T.departmentId and E.salary = T.DeptMax) as T2
on D.id = T2.deptId;