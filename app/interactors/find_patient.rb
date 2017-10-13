class FindPatient
  include Interactor

  def call
    if patient =  PatientRepository.find_patient_by_id(context[:id]) #Patient.find(context[:id])
      context.patient = patient
    else
      context.fail!(message: "find_patient.failure")
    end
  end
end
