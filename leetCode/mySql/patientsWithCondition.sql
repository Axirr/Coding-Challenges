# Write your MySQL query statement below

select patient_id, patient_name, conditions from Patients where conditions regexp '\\bDIAB1'

# split conditions over space
# foreach condition check if prefix diab1