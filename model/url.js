import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    longUrl : { type : String, required : true, unique : false},
    shortId : { type : String, required : true, unique : true},
    email : { type : String, required : true},
    analytics : [
        {
            type : Date,
            required : false
        }
    ]
    // username : { type : String, required : true}
}, { timestamps : true })


//make the schema into a model
const urlModel = mongoose.model("url", urlSchema)

export default urlModel;