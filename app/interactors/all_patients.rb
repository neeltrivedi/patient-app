class AllPatients
  include Interactor

  def call
    # instance = PatientRepository.new
    if patients =  PatientRepository.all_patients #Patient.all
      context.patients = patients
    else
      context.fail!(message: "all_patients.failure")
    end
  end
end
