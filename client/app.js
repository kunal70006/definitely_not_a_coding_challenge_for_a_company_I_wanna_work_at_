const inputField = document.querySelector(".input");
const section = document.querySelector(".replyContainer");

window.addEventListener("load", () => {
  getComments();
});

const getComments = async () => {
  try {
    const res = await fetch("http://localhost:5000/");
    const data = await res.json();
    // console.log(data);

    // Generating HTML
    data.map((comment) => {
      const container = document.createElement("div");
      const authorName = document.createElement("h1");
      const content = document.createElement("p");
      const btnDiv = document.createElement("div");
      const upvoteBtn = document.createElement("button");
      const replyBtn = document.createElement("button");

      // Adding classes to the elements created above
      container.classList = "commentContainer";
      authorName.classList = "commentAuthor";
      content.classList = "commentContent";
      btnDiv.classList = "btnDiv";
      upvoteBtn.classList = "btn";
      replyBtn.classList = "btn";

      // Adding values to the elements
      authorName.textContent = comment.author;
      content.textContent = comment.comment;
      if (comment.upvoteCount === 0) upvoteBtn.textContent = "Upvote";
      else {
        upvoteBtn.textContent = comment.upvoteCount;
      }
      replyBtn.textContent = "Reply";

      upvoteBtn.addEventListener("click", async () => {
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
          const res = await fetch("http://localhost:5000/", postObj);
          const data = await res.json();
          console.log(data);
          location.reload();
        } catch (error) {
          console.log(error);
        }
      });

      // appending everything to the parent and DOM
      container.appendChild(authorName);
      container.appendChild(content);
      btnDiv.appendChild(upvoteBtn);
      btnDiv.appendChild(replyBtn);
      container.appendChild(btnDiv);
      section.appendChild(container);
    });
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async () => {
  const inputVal = inputField.value;
  const author = Math.floor(Math.random() * 10000);
  const commentObj = {
    comment: inputVal,
    author: author.toString(),
  };
  const postObj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentObj),
  };
  try {
    const res = await fetch("http://localhost:5000/", postObj);
    const data = await res.json();
    console.log(data);
    inputField.value = "";
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
