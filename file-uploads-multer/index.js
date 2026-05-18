const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require("./models/file");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fileUploads")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));
const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./upload")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }   
});

const upload = multer({storage});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    return res.render("homepage");
})


app.post("/upload", upload.single("profileImage"), async (req, res) => {

    await File.create({
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
    });

    console.log("File saved in DB");

    return res.redirect("/");
});
app.listen(PORT,()=>console.log(`server started at port 8000`));