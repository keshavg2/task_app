class Task < ApplicationRecord
  enum :status, [:All, :Todo, :Inprogress, :Done]
end
