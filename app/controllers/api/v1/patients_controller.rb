module Api
  module V1
    class PatientsController < ApplicationController
      def index
      	patients = Patient.all
        render json: {status: 'SUCCESS', message:'Loaded Patients', data: patients},status: :ok
      end

      def show
        result = FindPatient.call({id: params[:id]})
        # patient =  Patient.find(params[:id])
        render json: {status: 'SUCCESS', message:'Loaded Patient', data: result.patient},status: :ok
      end

      def create
        # patient = Patient.new(patient_params)
        #
        # if patient.save
        #   render json: {status: 'SUCCESS', message:'Saved Patient', data: patient},status: :ok
        # else
        #   render json: {status: 'ERROR', message:'Not able to save Patient', data: patient.errors},status: :unprocessable_entity
        # end

        result = CreatePatient.call(patient_params)

        if result.success?
          render json: {status: 'SUCCESS', message:'Saved Patient', data: result.patient},status: :ok
        else
          render json: {status: 'ERROR', message:'Not able to save Patient', data: result.patient.errors},status: :unprocessable_entity
        end
      end

      def destroy
        result = FindPatient.call({id: params[:id]})
        # patient =  Patient.find(params[:id])
        result.patient.destroy
        render json: {status: 'SUCCESS', message:'Deleted Patient', data: result.patient},status: :ok
      end

      def update
        # result = FindPatient.call({id: params[:id]})
        patient =  Patient.find(params[:id])
        if patient.update_attributes(patient_params)
          render json: {status: 'SUCCESS', message:'Updated Patient', data: patient},status: :ok
        else
          render json: {status: 'ERROR', message:'Not able to update Patient', data: patient.errors},status: :unprocessable_entity
        end
      end

      private
      def patient_params
        params.require(:patient).permit(:first_name, :middle_name, :last_name, :weight, :height , :mrn)
      end

    end
  end
end
