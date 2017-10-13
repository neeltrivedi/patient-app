class FindEncounter
  include Interactor

  def call
    if encounter =  context.patient.encounters.find(context[:id])
      context.encounter = encounter
    else
      context.fail!(message: "find_encounter.faliure")
    end
  end
end
