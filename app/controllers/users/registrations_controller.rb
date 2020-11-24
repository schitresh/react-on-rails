class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!, only: %w[create]
  before_action :configure_permitted_parameters

  def create
    super do |resource|
      resource.referrer = get_referrer
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end

  def get_referrer
    User.find_by_refer_key(params[:referral])
  end
end