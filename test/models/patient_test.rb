require "test_helper"

describe Patient do
  let(:patient) { Patient.new }

  it "must be valid" do
    value(patient).must_be :valid?
  end
end
