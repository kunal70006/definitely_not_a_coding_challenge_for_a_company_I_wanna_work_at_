import { useState, useEffect } from "react";
import AllComments from "./components/AllComments";
import InputComponent from "./components/InputComponent";
import "./styles.css";

function App() {
  const [avatar, setAvatar] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

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

  return (
    <div className="parent">
      <div className="container">
        <InputComponent
          avatar={avatar}
          comment={comment}
          setComment={setComment}
          postComment={postComment}
        />
        <div className="divider" />
        <AllComments
          allComments={allComments}
          avatar={avatar}
          getComments={getComments}
        />
      </div>
    </div>
  );
}

export default App;
