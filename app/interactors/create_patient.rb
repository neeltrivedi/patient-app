class CreatePatient
  include Interactor

  def call
    hash_for_interactor = {mrn: context[:mrn], first_name: context[:first_name], middle_name: context[:middle_name], last_name: context[:last_name], weight: context[:weight], height: context[:height]}
    patient = Patient.new(hash_for_interactor)
    
    if patient.save
      context.patient = patient
    else
      context.fail!(message: "create_patient.faliure")
    end
  end
end
