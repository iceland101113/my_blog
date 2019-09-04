class Api::V1::AuthController < ApiController
  skip_before_action :authenticate_user_from_token!, only: :login

  # POST /api/v1/login
  def login
    if params[:email] && params[:password]
      user = User.find_by_email(params[:email])
    end

    if user && user.valid_password?(params[:password])
      user_data = {
        id: user.id,
        email: user.email,
      }

      render json: {
        message: "Ok",
        auth_token: user.authentication_token,
        user: user_data
      }
    else
      render json: { message:  "Email or Password is wrong" }, status:  401
    end
  end

  # POST /api/v1/logout
  def logout
    # 登入時刷新 token，做為下次登入時比對用，而舊的 token 就失效了
    current_user.generate_authentication_token
    current_user.save!

    render json: { message:  "Ok" }
  end
end
