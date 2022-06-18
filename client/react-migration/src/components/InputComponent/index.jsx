const InputComponent = ({ avatar, comment, setComment, postComment }) => {
  return (
    <>
      {" "}
      <h1 className="title">Discussion</h1>
      <div className="inputContainer">
        <img src={avatar || ""} alt="avatar" className="avatar" />
        <input
          type="text"
          placeholder="What are your thoughts?"
          className="input"
          value={comment || ""}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="commentBtn" onClick={postComment}>
          Comment
        </button>
      </div>
    </>
  );
};

export default InputComponent;
