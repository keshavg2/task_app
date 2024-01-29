class Api::TaskController < Api::BaseController
    def index
      status = params[:status]
      query = params[:query]
      task = Task.all
      if status.present?
        task = task.where(status: status)
      end
      if query.present?
        task = task.where('lower(title) LIKE ? OR lower(description) LIKE ?', "%#{query.downcase}%", "%#{query.downcase}%")
      end
      task = task.order(:created_at)
      render json:{ success: true, data: task }, status: :ok
    end

    def create
      id = params[:params][:id]
      title = params[:params][:title]
      description = params[:params][:description]
      status = params[:params][:status]
      if id.present?
        task = Task.find(id)
        if task.update(title: title, description:description, status: status)
          render json:{ success: true, message: 'Task is successfully updated'}, status: :ok
        else
          render json:{ success: false, error: 'Task is not updated'}, status: :bad_gateway
        end
      else
        todo_task = Task.where(status:'Todo').size
        task = Task.all.size
        if status == 'Todo' && todo_task > task / 2
          render json:{ success: false, message: 'Todo Task is not created beacause It will have greater than 50 %'}, status: :ok
          return
        end
        task = Task.new(title: title, description:description, status: status)
        if task.save
          render json:{ success: true, message: 'Task is successfully created'}, status: :ok
        else
          render json:{ success: false, error: 'Task is not created'}, status: :bad_gateway
        end
      end

    end

    def update
      id = params[:id]
      title = params[:title]
      description = params[:description]
      status = params[:status]
      task = Task.find(id)
      if task.update(title: title, description:description, status: status)
        render json:{ message: 'Task is successfully updated'}, status: :ok
      else
        render json:{ error: 'Task is not updated'}, status: :bad_gateway
      end
    end

    def delete
      id = params[:id]
      task = Task.find(id)
      task.delete
      render json:{ success: true, message: 'Task is deleted successfully'}, status: :ok
    end
end
