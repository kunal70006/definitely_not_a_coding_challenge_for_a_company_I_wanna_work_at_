const InputComponent = ({
  avatar,
  comment,
  setComment,
  postComment,
  btnText,
  commentToSend,
}) => {
  return (
    <>
      {" "}
      <div className="inputContainer">
        <img src={avatar || ""} alt="avatar" className="avatar" />
        <input
          type="text"
          placeholder="What are your thoughts?"
          className="input"
          value={comment || ""}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="commentBtn"
          onClick={() => postComment(commentToSend)}
          disabled={comment.length === 0}
        >
          {btnText}
        </button>
      </div>
    </>
  );
};

export default InputComponent;
