require 'test_helper'

class EncounterRepositoryTest < ActiveSupport::TestCase
  def setup
    super
    @patient = FactoryGirl.create :patient
    @encounter = FactoryGirl.create_list(:encounter, 3, patient_id: @patient.id)
    @encounter_1 = FactoryGirl.attributes_for :encounter, patient_id: @patient.id
  end

  test '#count all encounters of patient' do
    all_encounter_patient_count = EncounterRepository.all_encounters_of_patient(@patient).count
    assert_equal @encounter.count, all_encounter_patient_count
  end

  test '#find encounter by id' do
    encounter_data = EncounterRepository.find_encounter_by_id(@patient, @encounter.first.id)
    assert_equal @encounter.first.id, encounter_data.id
  end

  test '#create encounter' do
    initial_encounter_count = EncounterRepository.all_encounters_of_patient(@patient).count
    encounter_data = EncounterRepository.create_encounter(@patient, @encounter_1)
    new_encounter_count = EncounterRepository.all_encounters_of_patient(@patient).count
    assert_equal new_encounter_count, initial_encounter_count + 1
  end
end
