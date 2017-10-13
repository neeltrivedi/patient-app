class CreatePatient
  include Interactor

  def call
    patient, success = PatientRepository.create_patient(context.patient) #Patient.new(context.patient)

    if success
      context.patient = patient
    else
      context.fail!(message: "create_patient.failure")
    end
  end
end
