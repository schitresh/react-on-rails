Rails.application.routes.draw do
  root to: 'home#index'
  namespace :users do
    get 'logged_in'
    get 'refer'
  end
  devise_for :users, controllers: { registrations: 'users/registrations' }
  match '*path', to: 'home#index', via: :all
end
