class FindPatient
  include Interactor

  def call
    if patient =  Patient.find(context[:id])
      context.patient = patient
    else
      context.fail!(message: "find_patient.faliure")
    end
  end
end
