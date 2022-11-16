# Write your MySQL query statement below

# self left join where id = p_id

select distinct T.id1 as id, if(T0.id is null, "Root", if(T.id2 is null, "Leaf","Inner")) as type from Tree T0 right join 
    (select T1.id as id1, T1.p_id as p_id, T2.id as id2 from Tree T1 left join Tree T2 on T1.id = T2.p_id) as T
on T0.id = T.p_id order by T.id1;