require "test_helper"
require "factory_girl_rails"

module Api
  module V1
    class PatientsControllerTest < ActionController::TestCase
        def setup
          super
          # @patient = patients(:one)
          @patient = FactoryGirl.build :patient
        end

        test '#index' do
          get :index
          assert_response :ok
        end

        test "#show" do
          get :show, params: { id: @patient }
          assert_response :ok
        end

        test "#create" do
          post :create, params: { patient: @patient.attributes }
          assert_response :ok
        end

        test "#destroy" do
          delete :destroy, params: { id: @patient }
          assert_response :ok
        end

        # test "#edit" do
        #   put :update, params: { id: @patient, patient_params: @patient.attributes }
        #   assert_response :ok
        # end
    end
  end
end


# module Api
#   module V1
#     describe PatientsController do
#       setup do
#         @patient = patients(:one)
#       end
#
#       it "#index" do
#         get api_v1_patients_path
#         assert_response :ok
#       end
#
#       it "#show" do
#         get api_v1_patient_path(@patient)
#         assert_response :ok
#       end
#
#       it "#create" do
#         post api_v1_patients_path, params: { patient: @patient.attributes }
#         assert_response :ok
#       end
#     end
#   end
# end
