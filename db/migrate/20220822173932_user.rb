class User < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t| 
      t.string :username
      t.string :password
      t.text :profile_pic
      t.string :email
    end
  end
end
