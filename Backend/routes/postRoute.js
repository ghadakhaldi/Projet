const express = require("express")
const User = require("../models/User")
const isAuth = require("../middlewares/passport")
const router = express.Router()
const { validationResult, check } = require("express-validator")
const Post=require("../models/postMessage")
const PostMessage = require("../models/postMessage")
//create post
router.post(
    '/',
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        //const user = await User.findById(req.user.id).select('-password');
        //console.log(user)
  
        const newPost = new Post({
          text: req.body.text,
          
          descreption:req.body.descreption
        });

        const post = await newPost.save();

        res.json(post);
} catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    }
);

//get all posts
router.get('/all',async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  //get by id
  router.get('/:id', async (req, res) => {
    try {
      const posts = await Post.findById(req.params.id);
  
      if (!posts) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      res.json(posts);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

//delete post
router.delete('/:id',isAuth(),async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
//update  a post
router.patch ('/:id',isAuth(),async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
//like
router.put('/like/:id', isAuth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
console.log(post.comments)
    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg:'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//Unlike
router.put('/unlike/:id', isAuth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//comment a post
router.post(
  '/comment/:id',
  isAuth(),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);  
//delete comment
router.delete('/comment/:id/:comment_id', isAuth(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );
    await post.save();
    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}); 

module.exports=router