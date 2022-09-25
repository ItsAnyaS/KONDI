Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #Entry Routes
  #get all entries
  get "/entries", to: "entry#index"
  #get entry by user id
  post "/entries/user", to: "entry#entries_by_user"
  #get single entry
  get "entries/edit/:id", to: "entry#entries_get_single"
  #delete entry
  delete "/entries/delete/:id", to: "entry#delete_entry"
  #edit entry
  patch "/entries/edit/:id", to: "entry#edit_entry"
  #create new entry
  post "/entries", to: "entry#new_entry"

  #User Routes
  #get all users
  get "/users", to: "user#index"
  #delete user
  delete "/users/delete/:id", to: "user#delete_user"
  # edit username
  patch "/user/edit/username/:id", to: "user#edit_username"
  #edit password
  patch "/user/edit/password/:id", to: "user#edit_password"
  #edit profile pic
  patch "/user/edit/profilepic/:id", to: "user#edit_profile_pic"
  #edit email
  patch "/user/edit/email/:id", to: "user#edit_email"
  #create new user
  
  
  post "/auth/signup", to: "auth#sign_up"
  post '/auth/login', to: 'auth#login'

  #YAy Organization
end
