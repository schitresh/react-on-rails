class AddReferralToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :refer_key, :string
    add_reference :users, :referrer
  end
end
