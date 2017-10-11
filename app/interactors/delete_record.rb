class DeleteRecord
  include Interactor

  def call
    if context.record.destroy
      context.delete_record = context.record
    else
      context.fail!(message: "delete_record.faliure")
    end
  end
end
