# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do |i|
  user_name = FFaker::Name.first_name
  User.create!(
    email: "#{user_name}@example.com",
    password: "12345678"
  )
end

25.times do |i|
  Post.create!(
    title: FFaker::Lorem.sentence,
    content: FFaker::Lorem.paragraph,
    user: User.all.sample,
    status: rand(1..2),
  )
end

Post.all.each do |post|
  comment_counts = rand(0..5)
  comment_counts.times do |i|
    post.comments.create!(
      content: FFaker::Lorem.sentence,
    )
  end
end
