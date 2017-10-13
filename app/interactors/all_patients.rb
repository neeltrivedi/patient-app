class AllPatients
  include Interactor

  def call
    if patients =  Patient.all
      context.patients = patients
    else
      context.fail!(message: "all_patients.faliure")
    end
  end
end
