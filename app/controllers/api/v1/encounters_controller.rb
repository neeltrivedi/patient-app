module Api
  module V1
    class EncountersController < ApplicationController
      def index
      	patient = Patient.find(params[:patient_id])
      	encounters = patient.encounters
        render json: {status: 'SUCCESS', message:'Loaded Patient Encounters', data: encounters},status: :ok
      end

      def show
        patient = Patient.find(params[:patient_id])
  	    encounter = patient.encounters.find(params[:id])
        render json: {status: 'SUCCESS', message:'Loaded Patient encounter', data: encounter},status: :ok
      end

      def create
        patient = Patient.find(params[:patient_id])
        encounter = patient.encounters.create(encounter_params)

        if encounter.save
          render json: {status: 'SUCCESS', message:'Saved Patient encounter', data: encounter},status: :ok
        else
          render json: {status: 'ERROR', message:'Not able to save Patient encounter', data: encounter.errors},status: :unprocessable_entity
        end

      end

      def destroy
        patient = Patient.find(params[:patient_id])
      	encounter = patient.encounters.find(params[:id])
      	encounter.destroy
        render json: {status: 'SUCCESS', message:'Deleted Patient encounter', data: encounter},status: :ok
      end

      def update
        patient = Patient.find(params[:patient_id])
        encounter = patient.encounters.find(params[:id])
        if encounter.update_attributes(encounter_params)
          render json: {status: 'SUCCESS', message:'Updated Patient encounter', data: encounter},status: :ok
        else
          render json: {status: 'ERROR', message:'Not able to update Patient encounter', data: encounter.errors},status: :unprocessable_entity
        end
      end

      private
      def encounter_params
        params.require(:encounter).permit(:visit_number, :admitted_at, :discharged_at, :location, :room , :bed)
      end

    end
  end
end
