FactoryGirl.define do
  factory :encounter do
    id 1
    visit_number 'VN0001'
    admitted_at '2014-09-22 04:00:00'
    discharged_at '2014-09-24 14:00:00'
    location 'Fifth Ward'
    room 189
    bed 3
    patient_id 1
  end
end
