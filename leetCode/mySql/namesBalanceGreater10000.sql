# Write your MySQL query statement below

#select U.name, sum(T.amount) as balance from Users U left join Transactions T on U.account = T.account group by U.account having sum(T.amount) > 10000;

select name, balance from Users U inner join (select account, sum(amount) as balance from Transactions group by account having sum(amount) > 10000) as T on U.account = T.account; 