class Encounter < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :patient

  validates :visit_number, presence: true
	validates :admitted_at, presence: true
end
