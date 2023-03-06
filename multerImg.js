const mongoose = require('mongoose')

const ImgSchema = mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String 
    }
})

module.exports = ImageModel = mongoose.model('Image', ImgSchema)

// module.exports = mongoose.model("image", ImgSchema)


/// Buffer is similar to array data type