const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");

//@route    POST api/posts
//@desc     Create a post
//@access   Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      await newPost.save();
      res.json(newPost);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    Get api/posts
//@desc     Get all posts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//@route    Get api/posts/:id
//@desc     Get posts by id
//@access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post is not founded" });
    }
    res.json(post);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post is not founded" });
    }
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//@route    Delete api/posts/:id
//@desc     Delete posts by id
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post is not founded" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "User is not Authorized" });
    }

    await post.remove();
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post is not founded" });
    }

    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
