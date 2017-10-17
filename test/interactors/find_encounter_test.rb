require 'test_helper'

class FindEncounterTest < ActiveSupport::TestCase
  def setup
    super
    @patient = patients(:one)
    @encounter = encounters(:one)
    # @patient = FactoryGirl.create :patient
  end

  test '#find encounter' do
    result = FindPatient.call({id: @encounter.id, patient: @patient})
    assert result.success?
  end
end
