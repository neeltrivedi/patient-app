require 'test_helper'

class DeleteRecordTest < ActiveSupport::TestCase
  def setup
    super
    @patient = patients(:one)
    @encounter = encounters(:one)
    # @patient = FactoryGirl.create :patient
  end

  test '#delete record' do
    # data = { id: 1, mrn: THC123, first_name: James, middle_name: John, last_name: Smith, weight: 85, height: 180 }
    result = DeleteRecord.call(record: @patient)
    assert result.success?
  end
end
