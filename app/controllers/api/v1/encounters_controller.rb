module Api
  module V1
    class EncountersController < ApplicationController
      def index
        result = FindPatient.call({id: params[:patient_id]})
        result_encounters = AllEncountersPatient.call({patient: result.patient})
        render json: {status: 'SUCCESS', message:'Loaded Patient Encounters', data: result_encounters.encounters},status: :ok
      end

      def show
        result = FindPatient.call({id: params[:patient_id]})
        result_encounter = FindEncounter.call({id: params[:id], patient: result.patient})
        render json: {status: 'SUCCESS', message:'Loaded Patient encounter', data: result_encounter.encounter},status: :ok
      end

      def create
        result = FindPatient.call({id: params[:patient_id]})
        result_encounter = CreateEncounter.call({patient: result.patient, encounter: encounter_params})

        if result_encounter.success?
          render json: {status: 'SUCCESS', message:'Saved Patient encounter', data: result_encounter.encounter},status: :ok
        else
          render json: {status: 'ERROR', message:'Not able to save Patient encounter', data: result_encounter.encounter.errors},status: :unprocessable_entity
        end

      end

      def destroy
        result = FindPatient.call({id: params[:patient_id]})
        result_encounter = FindEncounter.call({id: params[:id], patient: result.patient})
        delete_encounter = DeleteRecord.call(record: result_encounter.encounter)

        if delete_encounter.success?
        render json: {status: 'SUCCESS', message:'Deleted Patient encounter', data: delete_encounter.encounter},status: :ok
        end
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
