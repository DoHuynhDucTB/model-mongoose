const mongoose = require('mongoose');

const {Comment} = require('../models/comments')
const {Group} = require('../models/groups')
const {Like} = require('../models/likes')
const {Post} = require('../models/posts')
const {Profile} = require('../models/profiles')
const {User} = require('../models/users')

mongoose.connect("mongodb://localhost:27017/model-mongoose",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("kết nối thành công"))
.catch(err => console.log(err))