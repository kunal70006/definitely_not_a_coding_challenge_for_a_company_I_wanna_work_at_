import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  comment: String,
  author: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  upvoteCount: {
    type: Number,
    default: 0,
  },
  replies: [],
});

const CommentModel = mongoose.model("CommentModel", commentSchema);
export default CommentModel;
