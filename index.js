// const express = require("express")
// const app = express()
// const mongoose = require("mongoose")
// const PostImg = require("./models/baseImg")
// const cors = require("cors")

// app.use(express.json())
// app.use(cors())
// // app.use(express.limit(100000000));

// mongoose.connect("mongodb://0.0.0.0:27017/selfMern?directConnection=true",{useNewUrlParser:true,useUnifiedTopology:true}).then(res => console.log("dataBase connected")).catch(err => console.log(err))

// app.get("/allimg", (req, res) => {
    
//     try {
//         PostImg.find().then(images => res.send(images)).catch(err => console.log(err))
//     } catch (error) {
//         res.status(401).json({message: error.message})        
//     }
// })
// app.post("/saveimg", async (req, res) => {
//     // console.log("run....")
//     const img = req.body
//     try {
//         const newImg = await PostImg.create(img)        
//         res.status(200).json({ message : "img has saved", newImg })
//     } catch (error) {
//         // console.log(error)
//         res.status(401).json({message: error.message})        
//     }
// })

// app.listen(5000, () => {
//     console.log("app listning on port 5000")
// })



//// using Multer - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
// Note :-  hige memory wali images save ker lega but fetch ni karega 
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const ImgSchema = require('./models/multerImg')
const fs = require('fs')

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://0.0.0.0:27017/selfMern?directConnection=true",{useNewUrlParser:true,useUnifiedTopology:true}).then(res => console.log("dataBase connected")).catch(err => console.log(err))

// which is call a storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')  // img is save in uploads folder
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

// configure our storage engine
const upload = multer({storage: storage})

app.post('/multer', upload.single('testImage'), (req, res)=>{
    // console.log("run")
    // res.send("res run")
    const saveImage = new ImgSchema({
        name: req.body.name,
        img:{
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: "image/png"
        },
    });
    saveImage.save()
    .then(ress => { res.send({ message : "image saved succsfully"}) })
    .catch(err => { res.send(err)})
})

app.get("/getmulter", async (req, res) => {
    const allData = await ImgSchema.find()
    res.json(allData)
})

app.listen(5000, () => {
    console.log("app listning on port 5000")
})









