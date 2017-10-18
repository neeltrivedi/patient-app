require 'test_helper'

class FindEncounterTest < ActiveSupport::TestCase
  def setup
    super
    # @patient = patients(:one)
    # @encounter = encounters(:one)
    @patient = FactoryGirl.create :patient
    @encounter = FactoryGirl.create :encounter, patient_id: @patient.id
  end

  test '#find encounter' do
    result = FindEncounter.call({id: @encounter.id, patient: @patient})
    assert result.success?
  end
end
