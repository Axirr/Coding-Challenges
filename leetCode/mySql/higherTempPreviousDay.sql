# Write your MySQL query statement below

select W.id from weather T inner join weather W on DATE_SUB(W.recordDate, INTERVAL 1 DAY) = T.recordDate where T.temperature < W.temperature;
# join on date - 1 = date