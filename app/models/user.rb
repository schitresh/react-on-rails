class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :referees, class_name: "User", foreign_key: :referrer_id
  belongs_to :referrer, class_name: "User", optional: true

  before_create :generate_refer_key

  def generate_refer_key
    loop do
      self.refer_key = SecureRandom.alphanumeric(8)
      break unless self.class.exists?(refer_key: refer_key)
    end
  end
end
