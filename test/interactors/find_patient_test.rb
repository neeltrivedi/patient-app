require 'test_helper'

class FindPatientTest < ActiveSupport::TestCase
  test '#find patient' do
    result = FindPatient.call({id: 1})
    assert result.success?
  end
end
