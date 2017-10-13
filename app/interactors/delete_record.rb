class DeleteRecord
  include Interactor

  def call
    if record = PatientRepository.delete_record(context.record) #context.record.destroy
      context.delete_record = record
    else
      context.fail!(message: "delete_record.failure")
    end
  end
end
