class ProjectsController < ApplicationController
  before_action :authorize_request
  before_action :is_admin
  before_action :find_project, only: [:add_developer, :remove_developer, :show_developer]
  
  def index
    @projects = Project.all
    return render json: @projects
  end

  def create
    @project = Project.new(project_params)
    @project.status = 'incomplete'
    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def add_developer
    @developer = User.find(params[:user_id])
    
    if @developer.projects.where(status: 'incomplete').empty?
      @developer.projects << @project
      render json: { message: 'Developer assigned to the project.' }
    else
      render json: { error: 'Developer is already assigned to another project or has a project in progress.' }
    end
  end

  def remove_developer
    @developer = User.find(params[:user_id])
    
    if @project.developers.exists?(@developer.id)
      @project.developers.delete(@developer)
      render json: { message: 'Developer removed from the project.' }
    else
      render json: { error: 'Developer is not assigned to this project.' }
    end
  end

  def available_developers
    developers = User.where(user_type: "developer").left_joins(:projects).where("projects.status = 'completed' OR projects.id IS NULL")
    render json: developers
  end

  def show_developer    
    render json:  @project.developers
  end

  private

  def project_params
    params.require(:project).permit(:name, :status, :image)
  end
  
  def is_admin
    return render json: {message: 'action allowed only for admin'} unless  @current_user.user_type == 'admin'
  end

  def find_project
    @project = Project.find(params[:id])
  end
end
