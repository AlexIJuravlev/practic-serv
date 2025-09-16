const Post = require("../models/Post");

//add

async function addPost(post) {
  const newPost = await Post.create(post)

  await newPost.populate({
    path: "comments",
    populate: "author",
  });;

  return newPost
}

//edit

async function editPost(id, post) {
  const newPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  });

  await newPost.populate({
    path: 'comments',
    populate: 'author'
  });

  return newPost;
}

//delete

function deletePost(id) {
  return Post.deleteOne({ _id: id });
}

// get list with search an pagi
async function getPosts(serach = "", limit = 10, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: serach, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Post.countDocuments({ title: { $regex: serach, $options: "i" } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}

//get item

async function getPost(id) {
  return Post.findById(id).populate({
    path: 'comments',
    populate: 'author'
  });
}

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getPost,
};
