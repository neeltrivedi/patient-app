require "test_helper"
module Api
  module V1
    describe PatientsController do
      setup do
        @patient = patients(:one)
      end

      it "#index" do
        get api_v1_patients_path
        assert_response :ok
      end

      it "#show" do
        get api_v1_patient_path(@patient)
        assert_response :ok
      end

      it "#create" do
        post api_v1_patients_path, params: { patient: @patient.attributes }
        assert_response :ok
      end
    end
  end
end
