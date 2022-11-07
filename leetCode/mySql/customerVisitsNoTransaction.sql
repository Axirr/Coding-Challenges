# Write your MySQL query statement below

#select V.visit_id from Visits V, Transactions T where V.visit_id = T.visit_id;

select customer_id, count(*) as count_no_trans from Visits where visit_id not in (select V.visit_id from Visits V inner join Transactions T on V.visit_id = T.visit_id) group by customer_id;

# from Visits V join Transactions T on V.visit_id = T.visit_id 