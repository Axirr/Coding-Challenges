# Write your MySQL query statement below

# select * from Stocks S1 left join Stocks S2 on S1.operation = "Buy" and S2.operation = "Sell" and S2.operation_day >= S1.operation_day order by S2.operation_day desc;

select A.stock_name as stock_name, sum(A.price) - sum(B.price) as capital_gain_loss from (select row_number() over (order by stock_name, operation_day) myRow,
        stock_name, operation_day, price
from Stocks where operation = "Sell") as A
left join
(select row_number() over (order by stock_name, operation_day) myRow,
        stock_name, operation_day, price
from Stocks where operation = "Buy") as B on A.myRow = B.myRow group by A.stock_name;