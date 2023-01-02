select request_at as Day,
    round(
        1.0
        -
        cast(
            sum(case when status = "completed" then 1 
            else 0 
            end) 
        as float)
        /
        cast(
            count(status) 
        as float)
    , 2) as "Cancellation Rate"
from trips
where client_id in 
    (select users_id from users
    where banned = "No")
and driver_id in 
    (select users_id from users where banned = "No")
and request_at >= "2013-10-01" and request_at <= "2013-10-03"
group by request_at;