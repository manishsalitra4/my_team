Rails.application.routes.draw do

  post '/login', to: 'authentication#login'

  resources :projects do
    post 'add_developer/:user_id', to: 'projects#add_developer', on: :member
    delete 'remove_developer/:user_id', to: 'projects#remove_developer', on: :member
    get 'available_developers', on: :collection
    get 'show_developer', on: :member
  end

  resources :users do
    get 'show_projects', on: :member    
  end
end
