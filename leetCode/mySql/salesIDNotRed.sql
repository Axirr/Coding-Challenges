# Write your MySQL query statement below

select name from SalesPerson where sales_id not in (select SalesPerson.sales_id from SalesPerson inner join (select sales_id from Company inner join Orders where Company.com_id = Orders.com_id and Company.name = "RED") as T where SalesPerson.sales_id = T.sales_id);

# join company and orders on com_id =
# join SalesPerson and result on sales_id = where com_name = RED
# select SalesPerson.name not in second result