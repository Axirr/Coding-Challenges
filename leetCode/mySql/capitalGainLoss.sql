# Write your MySQL query statement below

# Write your MySQL query statement below

select A.stock_name, B.mySum - A.mySum as capital_gain_loss from (select stock_name, sum(price) as mySum from Stocks where operation = "Buy" group by stock_name) as A
left join
(select stock_name, sum(price) as mySum from Stocks where operation = "Sell" group by stock_name) as B on A.stock_name = B.stock_name;

-- select A.stock_name as stock_name, sum(A.price) - sum(B.price) as capital_gain_loss from (select row_number() over (order by stock_name, operation_day) myRow,
--         stock_name, operation_day, price
-- from Stocks where operation = "Sell") as A
-- left join
-- (select row_number() over (order by stock_name, operation_day) myRow,
--         stock_name, operation_day, price
-- from Stocks where operation = "Buy") as B on A.myRow = B.myRow group by A.stock_name;