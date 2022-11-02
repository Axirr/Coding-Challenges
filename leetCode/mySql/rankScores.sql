# Write your MySQL query statement below

select score, DENSE_RANK() OVER(ORDER BY SCORE DESC) 'Rank' from  Scores;