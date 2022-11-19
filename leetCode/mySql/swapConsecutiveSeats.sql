# Write your MySQL query statement below

select * from (select id+1 as id, student from Seat where mod(id, 2) = 1 and id not in (select max(id) from Seat)
union
select id-1 as id, student from Seat where mod(id, 2) = 0
union
select id, student from Seat where id in (select max(id) from Seat) and mod(id, 2) = 1) as A order by id;

-- select * from (select S2.id as id, S1.student as student from Seat S1 right join Seat S2 on S1.id + 1 = S2.id where mod(S2.id, 2) = 0
-- union
-- select S1.id as id, S2.student as student from Seat S1 left join Seat S2 on S1.id + 1 = S2.id where mod(S1.id, 2) = 1 and S1.id not in (select max(id) from Seat)
-- union
-- select * from (select id, student from Seat order by id desc limit 1) as B where mod(id, 2) = 1) as A order by id;