require 'test_helper'

class CreatePatientTest < ActiveSupport::TestCase
  def setup
    super
    # @patient = patients(:two)
    # @encounter = encounters(:one)
    # @patient = FactoryGirl.create :patient
    @patient = {:id=>2000, :mrn=>"THC123", :first_name=>"James", :middle_name=>"John", :last_name=>"Smith"}
  end

  test '#create patient' do
    # data = { mrn: THC123, first_name: James, middle_name: John, last_name: Smith, weight: 85, height: 180 }
    result = CreatePatient.call(patient: @patient)
    assert result.success?
  end
end
