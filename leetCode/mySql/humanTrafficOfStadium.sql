# Write your MySQL query statement below
select distinct K.id, K.visit_date, K.people
from stadium K inner join
    (select * from 
        (select M.id as mId,
                M.visit_date as mVisit, 
                M.people as mPeople, 
                L.id as lId, 
                L.visit_date as lVisit, 
                L.people as lPeople 
        from stadium M
        inner join stadium L
        on L.id + 1 = M.id and M.people >= 100 and L.people >= 100) as A
    inner join stadium R
    on R.id - 1 = mId and R.people >= 100) as Y
on K.id = mId or K.id = lId or K.id = Y.id;