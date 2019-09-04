class ApiController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :authenticate_user_from_token!

  def current_user
    token = request.headers['access-token']
    User.find_by(authentication_token: token)
  end

  private

  def authenticate_user_from_token!
    token = request.headers['access-token']
    return render json: { error: 'token invalid' } if !token

    user = User.find_by_authentication_token(token)
    return render json: { error: 'token invalid' } if !user

    # sign_in 是 Devise 的方法
    sign_in(user, store: false) if user
  end
end
