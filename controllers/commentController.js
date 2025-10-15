//  import model

const Post = require("../models/post");
const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  try {
    // fetch data from req body
    const { post, user, body } = req.body;

    // create a comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    // save new comment into database
    const savedComment = await comment.save();

    //    find the post using id, add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    ).populate("comments") //populate the comments array with comment documents
    .exec();

    res.json({
        success: true,
        post: updatedPost,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        error: "Error while creating comment",
    })
  }
};



