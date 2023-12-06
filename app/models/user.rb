class User < ApplicationRecord
  has_secure_password
  has_many :project_users
  has_many :projects,  through: :project_users
  enum user_type: [:admin, :developer]

  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
end