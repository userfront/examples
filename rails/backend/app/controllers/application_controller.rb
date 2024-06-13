USERFRONT_PUBLIC_KEY = OpenSSL::PKey.read(ENV["USERFRONT_JWT_PUBLIC_KEY"])
ALGORITHM = "RS256"

class ApplicationController < ActionController::API
  before_action :current_user

  def current_user
    token = request.headers['Authorization'].split(' ')[1]
    payload, header = JWT.decode(token, USERFRONT_PUBLIC_KEY, true, { algorithm: ALGORITHM })

    payload
  rescue NoMethodError
    # No token provided
    return
  end

  def authorized
    unless current_user
      render json: { message: "Unauthorized" }, status: :unauthorized
      return
    end

    true
  end
end
