const AllComments = ({ allComments, avatar, getComments }) => {
  const upvote = async (comment) => {
    try {
      const newCommentObj = {
        comment: comment.comment,
        author: comment.author,
        createdAt: comment.createdAt,
        upvoteCount: comment.upvoteCount + 1,
        replies: comment.replies,
        _id: comment._id,
        __v: comment.__v,
      };
      const postObj = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentObj),
      };
      const res = await fetch(
        "https://coding-challenge-2022.herokuapp.com/",
        postObj
      );
      const data = await res.json();
      if (res.status === 200) {
        getComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return allComments
    ? allComments.map((comment) => (
        <div key={comment._id} className="commentContainer">
          <div className="authorContainer">
            <img src={avatar} className="avatar" alt="avatar" />
            <h1 className="authorName">{comment.author}</h1>
            <p className="time">{comment.createdAt}</p>
          </div>
          <div className="contentContainer">
            <p className="content">{comment.comment}</p>
          </div>
          <div className="btnContainer">
            <button className="btn" onClick={() => upvote(comment)}>
              {comment?.upvoteCount === 0 ? "Upvote" : comment.upvoteCount}
            </button>
            <button className="btn">Reply</button>
          </div>
        </div>
      ))
    : null;
};

export default AllComments;
