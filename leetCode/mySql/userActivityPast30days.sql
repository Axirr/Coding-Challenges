# Write your MySQL query statement below

# select activity_date as day, count(*) as active_users from (select distinct user_id, activity_date from Activity) as T group by activity_date;

select activity_date as day, count(distinct user_id) as active_users from Activity where activity_date > date_sub('2019-07-27', interval 30 day) and activity_date <= '2019-07-27' group by activity_date;