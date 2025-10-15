const Post = require("../models/post");

exports.createPost= async(req, res) => {
    try{
        // fetch data from req body
        const {title, body}= req.body;

        // create post
        const post= new Post({
            title, body,
        });

        // save posts
        const savedPost= await post.save();

        res.json({
            success: true,
            message: "Post created successfully",
            post: savedPost,
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Error while creating post",
        })
    }
}


exports.getAllPost= async(req, res) => {
    try{

        const posts= await Post.find({}).populate("likes").populate("comments").exec();
        res.json({
            post: posts,
            message: "All posts fetched"
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Error while fetching all posts",
        })
    }
} 