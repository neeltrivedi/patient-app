class FindEncounter
  include Interactor

  def call
    if encounter =  EncounterRepository.find_encounter_by_id(context[:patient], context[:id]) #context.patient.encounters.find(context[:id])
      context.encounter = encounter
    else
      context.fail!(message: "find_encounter.faliure")
    end
  end
end
