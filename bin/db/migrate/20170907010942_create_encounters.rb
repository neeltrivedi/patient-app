class CreateEncounters < ActiveRecord::Migration[5.1]
  def change
    create_table :encounters do |t|
      t.string :visit_number
      t.string :admitted_at
      t.string :discharged_at
      t.string :location
      t.string :room
      t.integer :bed
      t.references :patient, foreign_key: true

      t.timestamps
    end
  end
end
