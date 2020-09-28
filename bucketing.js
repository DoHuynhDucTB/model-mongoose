const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/model-mongoose",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("kết nối thành công"))
.catch(err => console.log(err))

//post
const PostSchema = new mongoose.Schema({
    title: { type:String, required: true},
    content: { type:String, required: true}
})
const Post = mongoose.model("Post", PostSchema, "Post")

//comment
const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    username: { type:String, required: true},
    content : {type:String, required: true}
})
const Comment = mongoose.model("Comment", CommentSchema, "Comment")

//create instances
// const newPost = new Post({
//     title: "Post 1",
//     content: "content post 1"
// })
// newPost.save()
// .then(console.log)
// .catch(err => console.log)

// const comment1 = new Comment({
//     postId: newPost._id,
//     username: "name 1",
//     content: "content comment 1"
// })
// comment1.save()
// .then(console.log)
// .catch(err => console.log)

// const comment2 = new Comment({
//     postId: newPost._id,
//     username: "name 2",
//     content: "content comment 2"
// })
// comment2.save()
// .then(console.log)
// .catch(err => console.log)

// const comment3 = new Comment({
//     postId: newPost._id,
//     username: "name 3",
//     content: "content comment 3"
// })
// comment3.save()
// .then(console.log)
// .catch(err => console.log)

Comment.aggregate()
.facet({
    post: [
        {
            $skip: 2
        },
        {
            $limit:2
        },
        {
            $bucketAuto:
            {
                groupBy: '$postId',
                buckets: 2,
                output: {
                    comments: {$push: {
                        content: '$content'
                    }}
                }
            }
        }
    ]
})
.then(comments => console.log(JSON.stringify(comments, undefined, 2)))
.catch(console.log)