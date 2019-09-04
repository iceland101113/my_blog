class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  enum status: {
    :published   =>   1,
    :draft     =>   2,
  }
end
