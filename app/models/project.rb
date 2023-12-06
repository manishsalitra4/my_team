class Project < ApplicationRecord
  has_many :project_users
  has_many :developers, through: :project_users, class_name: 'User', foreign_key: 'user_id'

  has_one_attached :image
  
  enum status: [:completed, :incomplete]
end
