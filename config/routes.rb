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

  get 'empty', to: 'static_pages#empty'
  match 'auth/:provider/callback' => 'sessions#create_from_linkedin'
  match 'signout', to: 'sessions#destroy', as: 'signout'
  root to: "static_pages#landing"
end