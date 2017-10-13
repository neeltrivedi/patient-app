class AllEncountersPatient
  include Interactor

  def call
    if encounters =  context.patient.encounters
      context.encounters = encounters
    else
      context.fail!(message: "all_encounters_patient.faliure")
    end
  end
end
