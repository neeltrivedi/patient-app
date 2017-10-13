class AllEncountersPatient
  include Interactor

  def call
    if encounters =  EncounterRepository.all_encounters_of_patient(context.patient) #context.patient.encounters
      context.encounters = encounters
    else
      context.fail!(message: "all_encounters_patient.failure")
    end
  end
end
