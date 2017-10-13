class EncounterRepository

  def self.all_encounters_of_patient(patient)
    patient.encounters
  end

  def self.find_encounter_by_id(patient, id)
    patient.encounters.find(id)
  end

  def self.create_encounter(patient, encounter)
    new_encounter = patient.encounters.create(encounter)
    success = new_encounter.present?

    if new_encounter.save
      return new_encounter, success
    else
      return new_encounter, false
    end
  end
end
