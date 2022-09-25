# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
# #   Character.create(name: "Luke", movie: movies.first)

# #Destroy
# puts "Destroying..."
# User.destroy_all
# Entry.destroy_all

# # 
# puts "Seeding..."
# #Users
# 5.times do
#     User.create!(username:Faker::Internet.username, password:Faker::Internet.password, profile_pic:Faker::LoremPixel.image, email:Faker::Internet.safe_email)
# end

# #Entries
# 5.times do
#     Entry.create!(user_id:Faker::Number.between(from:1, to:5), content:Faker::Lorem.paragraph, title:Faker::Lorem.sentence)
# end

# puts "Done Seeding"