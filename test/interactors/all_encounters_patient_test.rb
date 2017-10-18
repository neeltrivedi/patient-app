require 'test_helper'

class AllEncountersPatientTest < ActiveSupport::TestCase
  def setup
    super
    # @patient = patients(:one)
    @patient = FactoryGirl.build :patient
  end

  test '#get all encounters of patient' do
    # data = { id: 1, mrn: THC123, first_name: James, middle_name: John, last_name: Smith, weight: 85, height: 180 }
    result = AllEncountersPatient.call(patient: @patient)
    assert result.success?
  end
end
