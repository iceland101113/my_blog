class Api::V1::PostsController < ApiController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  skip_before_action :authenticate_user_from_token!, only: [:get_all_posts, :show]

  # GET /posts
  # GET /posts.json
  def index
    published_posts = current_user.posts
                                  .published
                                  .order(updated_at: :desc)

    draft_posts = current_user.posts
                              .draft
                              .order(updated_at: :desc)

    @published_posts = published_posts.map do |published_post|
      {
        title: published_post.title,
        comment_counts: published_post.comments_count,
        updated_at: published_post.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        id: published_post.id,
      }
    end

    @draft_posts = draft_posts.map do |draft_post|
      {
        title: draft_post.title,
        comment_counts: draft_post.comments_count,
        updated_at: draft_post.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        id: draft_post.id,
      }
    end

    render json: {
      data: {
        published_posts: @published_posts,
        draft_posts: @draft_posts,
      }
    }
  end

  def get_all_posts
    posts = Post.published.order(updated_at: :desc)
    @posts = posts.map do |post|
      {
        title: post.title,
        user: post.user.email,
        comment_counts: post.comments_count,
        updated_at: post.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        id: post.id,
      }
    end

    render json: {
      data: @posts,
      post_counts: posts.count,
      user_counts: User.count,
    }
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    render json: {
      data: @post
    }
  end

  # GET /posts/new
  def new
    @post = Post.new
    render json: {
      data: @post
    }
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: {
        data: @post
      }
    else
      render json: {
        errors: @post.errors
      }
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if @post.update(post_params)
      render json: {
        data: @post
      }
    else
      render json: {
        errors: @post.errors
      }
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    render json: {
      data: {
        post: { key: @post.id },
        status: @post.status,
      }
    }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :content, :status)
    end
end
