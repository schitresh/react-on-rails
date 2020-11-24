class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: %w[logged_in]

  def logged_in
    if user_signed_in?
      render json: { status: true, user: current_user.to_json }
    else
      render json: { status: false }
    end
  end

  def refer
    ReferralMailer.refer_via_email(current_user.name, current_user.refer_key, params[:referred_email]).deliver_now
    render json: { status: true }
  end
end
