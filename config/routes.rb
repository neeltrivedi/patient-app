Rails.application.routes.draw do
  root to: "pages#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace 'api' do
    namespace 'v1' do
      resources :patients do
        resources :encounters
      end
    end
  end
end
