class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!, only: %w[create]
  before_action :configure_permitted_parameters

  def create
    super do |resource|
      resource.referrer_id = get_referrer.id
      resource.save
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end

  def get_referrer
    User.find_by_refer_key(params[:referrer])
  end

  def after_sign_up_path_for(resource)
    root_path
  end
end