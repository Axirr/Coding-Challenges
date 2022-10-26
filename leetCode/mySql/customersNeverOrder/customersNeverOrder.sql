# Write your MySQL query statement below

select Customers.name as Customers from Customers where Customers.id not in (select Orders.customerId as id from Customers inner join Orders on Customers.id=Orders.customerId);

# where not exists (orders for customer)
# select id join on id=id
# not in the above