# Write your MySQL query statement below

# select actor_id, director_id from (select A1.actor_id, A1.director_id, COUNT(*) as MyCount from ActorDirector A1 inner join ActorDirector A2 where A1.timestamp != A2.timestamp and A1.actor_id = A2.actor_id and A1.director_id = A2.director_id group by A1.actor_id, A1.director_id) as T where MyCount >= 3;

#select actor_id, director_id from (select actor_id, director_id, count(*) as MyCount from ActorDirector group by actor_id, director_id) as T where MyCount >= 3;

select actor_id, director_id from ActorDirector group by actor_id, director_id having count(*) >= 3;