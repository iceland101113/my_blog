class Api::V1::CommentsController < ApiController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]
  skip_before_action :authenticate_user_from_token!
  # before_action :authenticate_user!, only: []

  # GET /comments
  # GET /comments.json
  def index
    post = Post.find(params[:post_id])
    comments = post.comments.order(updated_at: :desc)
    @comment = Comment.new

    @comments = comments.map do |comment|
      {
        content: comment.content,
        created_at: comment.created_at.strftime('%Y-%m-%d %H:%M:%S')
      }
    end

    render json: {
      data: {
        comments: @comments,
        new_comment: @comment,
      }
    }
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # POST /comments
  # POST /comments.json
  def create
    post = Post.find(params[:post_id])
    @comment = post.comments.new(comment_params)
    if @comment.save
      render json: {
        data: @comment
      }
    else
      render json: {
        errors: @comment.errors
      }
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  # def destroy
  #   @comment.destroy
  #   respond_to do |format|
  #     format.html { redirect_to comments_url, notice: 'Comment was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:content)
    end
end
