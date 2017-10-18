require 'test_helper'

class PatientRepositoryTest < ActiveSupport::TestCase
  def setup
    super
    @patient = FactoryGirl.create_list(:patient, 3)
    @patient_1 = FactoryGirl.attributes_for :patient
  end

  test '#count all patients' do

    all_patients_count = PatientRepository.all_patients.count
    assert_equal @patient.count, all_patients_count - 2
  end

  test '#find patient by id' do
    patient_data = PatientRepository.find_patient_by_id(@patient.first.id)
    assert_equal @patient.first.id, patient_data.id
  end

  test '#create patient' do
    initial_patient_count = PatientRepository.all_patients.count
    patient_data = PatientRepository.create_patient(@patient_1)
    new_patient_count = PatientRepository.all_patients.count
    assert_equal new_patient_count, initial_patient_count + 1
  end

  test '#delete record' do
    initial_patient_count = PatientRepository.all_patients.count
    patient_data = PatientRepository.delete_record(@patient.first)
    new_patient_count = PatientRepository.all_patients.count
    assert_equal new_patient_count, initial_patient_count - 1
  end
end
