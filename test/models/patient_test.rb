require "test_helper"

class PatientTest < ActiveSupport::TestCase
  context '#validations' do
    should validate_presence_of(:first_name)
    should validate_presence_of(:middle_name)
    should validate_presence_of(:mrn)
  end

  context '#association' do
    should have_many(:encounters)
  end
end
