const Post = require("../models/post");
const Like = require("../models/like");
const { default: mongoose } = require("mongoose");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });

    const savedLike = await like.save();

    // update posts collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes") //populate the comments array with comment documents
      .exec();

    res.json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error while liking the post",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    const likeObjectId = new mongoose.Types.ObjectId(like);


    // find and delete likes in like and post collection
    const deletedLikes = await Like.findOneAndDelete({
      post: post,
      _id: likeObjectId,
    });

    // update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLikes } },
      { new: true }
    );
    res.json({
        success: true,
        post: updatedPost,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error while unliking the post",
    });
  }
};
