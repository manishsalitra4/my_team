class UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :set_user, only: [:show, :update, :destroy, :show_projects]

  def index
    @users = User.where(user_type: 'developer')
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    @user.user_type = "developer"
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show_projects    
    render json:  @user.projects
  end


  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      render json: @user
    else
      render json: @users.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find_by_id(params[:id])
    return render json: { message: "user not exist"} unless @user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :phone_number)
  end
end
