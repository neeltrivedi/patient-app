class CreateEncounter
  include Interactor

  def call
    encounter, success = EncounterRepository.create_encounter(context[:patient], context[:encounter])#context.patient.encounters.create(context.encounter)

    if success
      context.encounter = encounter
    else
      context.fail!(message: "create_encounter.failure")
    end
  end
end
