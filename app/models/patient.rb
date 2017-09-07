class Patient < ApplicationRecord
  include ActiveModel::Validations

  before_destroy :destroy_all_encounters

  has_many :encounters

  validates :first_name, presence: true
  validates :middle_name, presence: true
  validates :mrn, presence: true

  private
    def destroy_all_encounters
      self.encounters.delete_all
    end
end
