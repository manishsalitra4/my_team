class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :phone_number
      t.string :password_digest
      t.integer :user_type
      t.timestamps
    end
  end
end
