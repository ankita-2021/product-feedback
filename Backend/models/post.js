const mongoose = require("mongoose");
const slugify = require("slugify");
const { DateTime } = require("luxon");

//create schema...
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  upvotes: [String],
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    reuire: true,
  },
  comments: [
    {
      content: String,
      user: {
        image: String,
        name: String,
        email: String,
      },
      replies: [
        {
          content: String,
          replyingTo: String,
          user: {
            image: String,
            name: String,
            email: String,
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: DateTime.now().toUTC(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

PostSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Post", PostSchema);
