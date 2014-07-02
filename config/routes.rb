Teamprofile::Application.routes.draw do
  resources :groups
  resources :group_members, only: [:create, :destroy]
  resources :personality_types, only: [:show, :index]
  resources :quiz, only: [:show]
  resources :tips, only: [:show, :create, :destroy, :update]
  resources :tip_votes, only: [:create, :destroy]
  resources :users
  resources :user_answers, only: [:index, :create]

  resource :session

  get 'empty',    to: 'static_pages#empty'

  get 'support',  to: 'static_pages#support'
  get 'home',     to: 'static_pages#home'
  get 'how',      to: 'static_pages#how'
  get 'privacy',  to: 'static_pages#privacy'
  get 'terms',    to: 'static_pages#terms'

  match 'auth/:provider/callback' => 'sessions#create_from_linkedin'
  match 'signout', to: 'sessions#destroy', as: 'signout'
  root to: "static_pages#landing"
end