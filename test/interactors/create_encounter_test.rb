require 'test_helper'

class CreateEncounterTest < ActiveSupport::TestCase
  def setup
    super
    @patient = FactoryGirl.create :patient
    @encounter = FactoryGirl.attributes_for :encounter
    # @patient = patients(:one)
    # @encounter = {:id=>2000, :visit_number=>"VN0001", :admitted_at=>"2014-09-22 04:00:00", :discharged_at=>"2014-09-24 14:00:00", :location=>"Fifth Ward", :room=> 189, :bed=> 3, :patient_id=> 1}
  end

  test '#create encounter' do
    # data = { mrn: THC123, first_name: James, middle_name: John, last_name: Smith, weight: 85, height: 180 }
    result = CreateEncounter.call(patient: @patient, encounter: @encounter)
    assert result.success?
  end
end
