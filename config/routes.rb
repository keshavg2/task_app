Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"

  namespace :api do
    get 'task/index' => 'task#index'
    post 'task/create' => 'task#create'
    patch 'task/update' => 'task#update'
    get 'task/delete' => 'task#delete'
  end

  match '*path', to: 'home#index', via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
