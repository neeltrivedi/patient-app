FactoryGirl.define do
  factory :patient do
    mrn 'THC123'
    first_name 'James'
    middle_name 'John'
    last_name 'Smith'
    weight 85
    height 180
  end
end
