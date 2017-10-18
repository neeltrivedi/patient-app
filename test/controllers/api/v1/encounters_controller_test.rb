require "test_helper"
module Api
  module V1
    class EncountersControllerTest < ActionController::TestCase
      def setup
        super
        # @patient = patients(:one)
        # @encounter = encounters(:one)
        @patient = FactoryGirl.create :patient
        @encounter = FactoryGirl.create :encounter, patient_id: @patient.id
        @encounter_1 = FactoryGirl.attributes_for :encounter, patient_id: @patient.id
      end

      test "#index" do
        get :index, params: { patient_id: @patient }
        assert_response :ok
      end

      test "#show" do
        get :show, params: { patient_id: @patient, id: @encounter }
        assert_response :ok
      end

      test "#create" do
        post :create, params: { patient_id: @patient, encounter: @encounter_1 }
        assert_response :ok
      end

      test "#destroy" do
        delete :destroy, params: { patient_id: @patient, id: @encounter }
        assert_response :ok
      end

    end
  end
end
