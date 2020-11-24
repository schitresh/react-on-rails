class ReferralMailer < ApplicationMailer
  def refer_via_email(referee, refer_key, email)
    link = "http://localhost:3000/signup/#{refer_key}"
    mail(to: email, subject: "Join Shifts", body: "You have been referred to join 'Shifts' by #{referee}. Click on this link to signup: #{link}")
  end
end
