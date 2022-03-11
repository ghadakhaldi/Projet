const mongoose=require("mongoose")

const postSchema = mongoose.Schema({

    owner: String,
    city: String,
    descreption: String,
    moreDetails: [String],
    addPictures: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

module.exports=PostMessage;