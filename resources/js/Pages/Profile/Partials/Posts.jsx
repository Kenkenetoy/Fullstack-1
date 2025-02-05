const Posts = ({ post }) => {
    return (
        <div className="card card-compact mb-4 w-96 bg-base-100 shadow-xl">
            <figure>
                <img
                    src={post.image || 'https://via.placeholder.com/400x200'}
                    alt="Post"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl font-semibold">
                    {post.title}
                </h2>
                <p>{post.content}</p>
                <div className="card-actions justify-between">
                    <button className="btn btn-primary btn-sm">
                        Read More
                    </button>
                    <span className="text-sm text-gray-500">
                        Posted on{' '}
                        {new Date(post.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Posts;
