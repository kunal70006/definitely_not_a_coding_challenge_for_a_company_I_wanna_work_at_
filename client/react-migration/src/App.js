import { useState, useEffect } from "react";
import AllComments from "./components/AllComments";
import InputComponent from "./components/InputComponent";
import "./styles.css";

function App() {
  const [avatar, setAvatar] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [reply, setReply] = useState("");
  const [clicked, setClicked] = useState([]);

  const getComments = async () => {
    try {
      const res = await fetch("https://coding-challenge-2022.herokuapp.com/");
      const data = await res.json();
      // console.log(data);
      setAllComments(data);
      localStorage.setItem("allComments", JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getThumbnails = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/");
        const data = await res.json();
        setAvatar(data?.results[0]?.picture?.thumbnail);
      } catch (err) {
        console.log(err);
      }
    };
    getThumbnails();

    getComments();
  }, []);

  // Sync storage across pages
  useEffect(() => {
    window.addEventListener("storage", () => {
      getComments();
    });

    return () => window.removeEventListener("storage", () => getComments());
  }, []);

  const postComment = async () => {
    const author = Math.floor(Math.random() * 10000);
    const commentObj = {
      comment,
      author: author.toString(),
    };
    const postObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentObj),
    };
    try {
      const res = await fetch(
        "https://coding-challenge-2022.herokuapp.com/",
        postObj
      );
      const data = await res.json();
      console.log(data, res.status);
      if (res.status === 201) {
        getComments();
      }
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleReplyClick = (id) => {
    if (clicked.includes(id)) {
      const filtered = clicked.filter((val) => val !== id);
      setClicked(filtered);
    } else {
      setClicked((clicked) => [...clicked, id]);
    }
  };

  const postReply = async (comment) => {
    // deep copy of the original comment
    const tempObj = JSON.parse(JSON.stringify(comment));
    // if there arent any replies then simply push the og comment with value of comment key as reply
    if (tempObj.replies.length === 0) {
      tempObj.replies.push({ ...comment, comment: reply, upvoteCount: 0 });
      // else reset all the replies of the comment and then push the rest of the comment
    } else {
      tempObj.replies.push({
        ...comment,
        replies: [],
        comment: reply,
        upvoteCount: 0,
      });
    }
    const postObj = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempObj),
    };
    const res = await fetch(
      "https://coding-challenge-2022.herokuapp.com/",
      postObj
    );

    const data = await res.json();
    if (res.status === 200) {
      setReply("");
      getComments();
    }
  };

  return (
    <div className="parent">
      <div className="container">
        <h1 className="title">Discussion</h1>
        <InputComponent
          avatar={avatar}
          comment={comment}
          setComment={setComment}
          postComment={postComment}
          btnText="Comment"
        />
        <div className="divider" />
        <AllComments
          allComments={allComments}
          avatar={avatar}
          upvote={upvote}
          handleReplyClick={handleReplyClick}
          reply={reply}
          setReply={setReply}
          clicked={clicked}
          postReply={postReply}
        />
      </div>
    </div>
  );
}

export default App;
