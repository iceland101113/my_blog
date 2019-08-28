json.extract! post, :id, :title, :content, :status, :comments_count, :user_id, :created_at, :updated_at
json.url post_url(post, format: :json)
