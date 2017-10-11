class CreatePatient
  include Interactor

  def call
    patient = Patient.new(context.patient)

    if patient.save
      context.patient = patient
    else
      context.fail!(message: "create_patient.faliure")
    end
  end
end
