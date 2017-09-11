-- Answer 1
SELECT *
FROM public.patients
WHERE last_name LIKE '%mit%';

-- Answer 2
SELECT DISTINCT p.*
FROM public.patients p
JOIN public.encounters e ON e.patient_id = p.id
WHERE e.discharged_at IS NOT NULL;

-- Answer 3
SELECT DISTINCT p.*
FROM public.patients p
JOIN public.encounters e ON e.patient_id = p.id
WHERE e.admitted_at BETWEEN '2014-07-05' AND '2014-08-19';
