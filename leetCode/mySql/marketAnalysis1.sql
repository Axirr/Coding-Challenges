# Write your MySQL query statement below

select U.user_id as buyer_id, 
U.join_date as join_date, 
count(T.buyer_id) as orders_in_2019 
from Users U left join (
    select buyer_id 
    from Orders 
    where year(order_date) = '2019'
    ) as T 
on U.user_id = T.buyer_id group by U.user_id;

-- select U.user_id as buyer_id, 
-- U.join_date as join_date, 
-- count(T.buyer_id) as orders_in_2019 
-- from Users U left join (
--     select buyer_id 
--     from Orders 
--     where order_date between '2019-01-01' and '2019-12-31'
--     ) as T 
-- on U.user_id = T.buyer_id group by U.user_id;