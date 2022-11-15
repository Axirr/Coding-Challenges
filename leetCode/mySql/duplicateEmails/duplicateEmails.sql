# Write your MySQL query statement below

Select DISTINCT First.email as Email From Person First Join Person Second ON First.id != Second.id WHERE First.Email=Second.Email;

# Join over self
# select First.Id, First.Email where First.id != Second.id