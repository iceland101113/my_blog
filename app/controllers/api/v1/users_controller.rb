class Api::V1::UsersController < ApiController
skip_before_action :authenticate_user!

  def create
    @user = User.new(user_params)
    if @user.save
      render json: {
        data: @user
      }
    else
      render json: {
        errors: @user.errors
      }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.permit(:password, :email)
    end
end
