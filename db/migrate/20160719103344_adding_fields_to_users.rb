class AddingFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :full_name, :string
    add_column :users, :company, :string
    add_column :users, :job_title, :string
  end
end
