class PatientRepository

  def self.all_patients
    Patient.all
  end

  def self.find_patient_by_id(id)
    Patient.find(id)
  end

  def self.create_patient(patient)
    new_patient = Patient.new(patient)
    success = new_patient.present?
    if new_patient.save
      return new_patient, success
    else
      return new_patient, false
    end
  end

  def self.delete_record(record)
    record.destroy
  end
end
