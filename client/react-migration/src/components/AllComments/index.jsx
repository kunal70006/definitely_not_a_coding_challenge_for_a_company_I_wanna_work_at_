import InputComponent from "../InputComponent";

const AllComments = ({
  allComments,
  avatar,
  upvote,
  handleReplyClick,
  reply,
  setReply,
  clicked,
  postReply,
}) => {
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
            <button
              className="btn"
              onClick={() => handleReplyClick(comment._id)}
            >
              Reply
            </button>
            {clicked?.includes(comment._id) ? (
              <div style={{ margin: "1rem" }}>
                <InputComponent
                  avatar={avatar}
                  comment={reply}
                  setComment={setReply}
                  postComment={postReply}
                  btnText="Reply"
                  commentToSend={comment}
                />
              </div>
            ) : null}
          </div>
          <div className="repliesContainer">
            {comment?.replies?.length > 0 ? (
              <div className="replyContainer">
                <AllComments
                  allComments={comment.replies}
                  avatar={avatar}
                  upvote={upvote}
                />
              </div>
            ) : null}
          </div>
        </div>
      ))
    : null;
};

export default AllComments;
