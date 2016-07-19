class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.string :type
      t.string :host
      t.datetime :start_date
      t.datetime :end_date
      t.string :guest_list
      t.string :location
      t.text :message

      t.timestamps null: false
    end
  end
end
