import CommentModel from "../models/comment.js";

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createComments = async (req, res) => {
  const comment = req.body;
  // console.log(comment);
  const newComment = new CommentModel(comment);
  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUpvotes = async (req, res) => {
  const updatedPost = req.body;
  await CommentModel.findByIdAndUpdate(updatedPost._id, updatedPost);
  res.json(updatedPost);
};
