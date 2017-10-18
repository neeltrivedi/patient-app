require 'test_helper'

class FindPatientTest < ActiveSupport::TestCase
  def setup
    super
    @patient = FactoryGirl.create :patient
  end

  test '#find patient' do
    result = FindPatient.call({id: @patient.id})
    assert result.success?
  end
end
