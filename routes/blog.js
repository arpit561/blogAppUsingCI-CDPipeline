const express= require("express");
const router= express.Router();

// import controllers
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPost } = require("../controllers/PostController");
const { likePost, unlikePost } = require("../controllers/Likecontroller");



// mapping create
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPost);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);


// exports
module.exports= router;