const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/model-mongoose",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("kết nối thành công"))
.catch(err => console.log(err))

//comment
const CommentSchema = new mongoose.Schema({
    username: { type:String, required: true},
    content : {type:String, required: true}
})
const Comment = mongoose.model("Comment", CommentSchema, "Comment")

//post
const PostSchema = new mongoose.Schema({
    title: { type:String, required: true},
    content: { type:String, required: true},
    comments: {
        type: [CommentSchema],
        required:false
    }
})
const Post = mongoose.model("Post", PostSchema, "Post")

//create instances
const commnet1 = new Comment({
    username: "comment 1",
    content: "content comment 1"
})
const commnet2 = new Comment({
    username: "comment 2",
    content: "content comment 2"
})
const newPost = new Post({
    title: "title 1",
    content: "content 1",
    comments: [commnet1, commnet2]
})

newPost.save()
.then(console.log)
.catch(console.log)