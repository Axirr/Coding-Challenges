# Write your MySQL query statement below

select * from (
    select distinct Product.product_id as product_id, Product.product_name as product_name from Product inner join Sales on Product.product_id=Sales.product_id) as T 
    where T.product_id not in (
        select product_id from Sales where sale_date < "2019-01-01" OR sale_date > "2019-03-31");

# Find products sold outside that range
# Find products not in that set