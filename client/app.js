const inputField = document.querySelector(".input");
const section = document.querySelector(".replyContainer");
const thumbnailContainer = document.querySelector(".thumbnail");
const SERVER_URL = "https://coding-challenge-2022.herokuapp.com/";
let THUMBNAIL_SOURCE = "";

window.addEventListener("load", () => {
  getThumbnails().then(() => getComments());
  // getComments();
});

const getThumbnails = async () => {
  try {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    // console.log(data);
    THUMBNAIL_SOURCE = data?.results[0]?.picture?.thumbnail;
    if (THUMBNAIL_SOURCE.length > 0) {
      thumbnailContainer.appendChild(createThumbnails());
    }
  } catch (err) {
    console.log(err);
  }
};

const createThumbnails = () => {
  const img = document.createElement("img");
  img.classList = "thumbnailImage";
  img.src = THUMBNAIL_SOURCE;
  img.alt = "Thumbnail";
  return img;
};

const getComments = async () => {
  try {
    const res = await fetch(SERVER_URL);
    const data = await res.json();
    // console.log(data);

    // Generating HTML
    data.map((comment) => {
      const container = document.createElement("div");
      const authorName = document.createElement("h1");
      const authorDiv = document.createElement("div");
      const content = document.createElement("p");
      const btnDiv = document.createElement("div");
      const upvoteBtn = document.createElement("button");
      const replyBtn = document.createElement("button");

      // Adding classes to the elements created above
      container.classList = "commentContainer";
      authorName.classList = "commentAuthor";
      authorDiv.classList = "commentAuthorContainer";
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
          const res = await fetch(SERVER_URL, postObj);
          const data = await res.json();
          console.log(data);
          location.reload();
        } catch (error) {
          console.log(error);
        }
      });

      // appending everything to the parent and DOM
      console.log(THUMBNAIL_SOURCE);
      if (THUMBNAIL_SOURCE.length > 0) {
        authorDiv.appendChild(createThumbnails());
      }

      authorDiv.appendChild(authorName);
      container.appendChild(authorDiv);
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
    const res = await fetch(SERVER_URL, postObj);
    const data = await res.json();
    console.log(data);
    inputField.value = "";
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
