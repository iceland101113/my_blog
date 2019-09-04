Rails.application.routes.draw do
  devise_for :users

  root to: 'application#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :posts do
        resources :comments

      end
      resources :users, only: [:create]

      post "/login" => "auth#login"
      post "/logout" => "auth#logout"

      get "/get_all_posts" => "posts#get_all_posts"
    end
  end
end
