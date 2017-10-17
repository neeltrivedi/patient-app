require 'test_helper'

class AllPatientsTest < ActiveSupport::TestCase
  test '#get all patients' do
    result = AllPatients.call
    assert result.success?
  end
end
