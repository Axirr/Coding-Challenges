select E.name as Employee from Employee E left join Employee B on E.managerId=B.id where E.salary > B.salary;