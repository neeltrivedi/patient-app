class CreateEncounter
  include Interactor

  def call
    encounter = context.patient.encounters.create(context.encounter)
    if encounter.save
      context.encounter = encounter
    else
      context.fail!(message: "create_encounter.faliure")
    end
  end
end
