require "test_helper"

class EncounterTest < ActiveSupport::TestCase
  context '#validations' do
    should validate_presence_of(:visit_number)
    should validate_presence_of(:admitted_at)
  end

  context '#association' do
    should belong_to(:patient)
  end
end
