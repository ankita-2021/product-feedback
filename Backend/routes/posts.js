const express = require("express");
const router = express.Router();
const Post = require("../models/post");

const app = express();
app.use(express.json());

// //GET ALL THE POST...
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

//..................................................
// //step-1 create a new blog post...
// app.post("/posts", async (req, res) => {
//   try {
//     const { title, author, category, description } = req.body;
//     const getnewPost = new Post({ title, author, category, description });
//     await getnewPost.save();
//     res.status(201).json(getnewPost);
//     console.log(getnewPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

//...................................................
//CREATE ONE...
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    description: req.body.description,
  });
  try {
    const savePost = await post.save();
    res.json(savePost);
    console.log(savePost);
  } catch (error) {
    res.json({ message: error });
  }
});

//GET SPECIFIC POST...
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.json(post);
    console.log(post);
  } catch (error) {
    res.json({ message: error });
  }
});

//DELETE A SINGLE POST...
router.delete("/:id", async (req, res) => {
  try {
    const removePost = await Post.deleteOne({ _id: req.params.id });
    res.json(removePost);
    console.log(removePost, "remove post");
  } catch (error) {
    res.json({ message: error });
  }
});

//EDIT A POST...
router.patch("/edit/:slug", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {
        slug: req.params.slug,
      },
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          slug: req.body.title,
        },
      }
    );
    res.json(updatedPost);
    console.log(updatedPost, "updated post is here");
  } catch (error) {
    res.json({ message: error });
  }
});

//ADD A COMMENT IN COMMENT SECTION...
router.patch("/postcomment/:slug", async (req, res) => {
  try {
    const newComment = await Post.updateOne(
      {
        slug: req.params.slug,
      },
      {
        $push: {
          comments: req.body,
        },
      }
    );
    res.json(newComment);
  } catch (error) {
    res.json({ message: error });
  }
});

//ADD AN UPDATE...
router.patch("/postupvote/:id", async (req, res) => {
  try {
    const addUpvote = await Post.updateOne(
      {
        _id: req.params.id,
      },
      {
        $addToSet: {
          upvotes: req.body,
        },
      }
    );
    console.log(addUpvote);
    res.json(addUpvote);
  } catch (error) {
    res.json({ message: error });
  }
});

//REMOVE AN UPVOTE
router.patch("/removeupvote/:id", async (req, res) => {
  try {
    const removeUpvote = await Post.updateOne(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          upvotes: { $in: req.body },
        },
      }
    );
    res.json(removeUpvote);
  } catch (error) {
    res.json({ message: error });
  }
});

//REPLY TO A COMMENT
router.patch("/postreply/:id", async (req, res) => {
  try {
    const newReply = await Post.updateOne(
      {
        "comments._id": req.params.id,
      },
      {
        $push: { "comments.$[elem].replies": req.body },
      },
      {
        arrayFilters: [{ "elem._id": req.params.id }],
      }
    );
    res.json(newReply);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
