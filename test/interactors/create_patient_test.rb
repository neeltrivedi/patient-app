require 'test_helper'

class CreatePatientTest < ActiveSupport::TestCase
  def setup
    super
    # @patient = {:id=>2000, :mrn=>"THC123", :first_name=>"James", :middle_name=>"John", :last_name=>"Smith"}
    @patient = FactoryGirl.attributes_for :patient
  end

  test '#create patient' do
    # data = { mrn: THC123, first_name: James, middle_name: John, last_name: Smith, weight: 85, height: 180 }
    result = CreatePatient.call(patient: @patient)
    assert result.success?
  end
end
