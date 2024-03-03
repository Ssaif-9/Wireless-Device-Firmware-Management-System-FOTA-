const express = require("express");
const userServices = require("../services/admin")
const auth = require("../middleware/auth");
const multer = require("multer");
const bodyParser = require('body-parser');
const router = new express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

//                            Admin

const uploadNewsImage = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Please upload an Image file"));
    }
    cb(undefined, true);
  },
});
router.post("/admin/news",uploadNewsImage.single("image") ,async (req, res) => {
  try {
    payload = {
      title: req.body.title,
      content: req.body.content,
      image: req.file,
    };
    const result = await userServices.addNews(payload);
    if (result === 'No file uploaded.') {
      return res.status(400).send({
        error: result
      });
    }
    if (result === 'Title and Content are required') {
      return res.status(400).send({
        error: result
      });
    }
    res.status(201).send({message: 'News Created successful!', news: result});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//                    ADD Member
router.post("/admin/members", async (req, res) => {
    try{
        const payload = {
            name:       req.body.name,
            email:      req.body.email,
            password:   req.body.password,
            role:       req.body.role,
        };

        const result = await userServices.addMember(payload);

        if (result === 'All fields are required!' || result === 'Password must be at least 8 characters!' || result === 'Failed to create user!' || result === 'Permission does not exist!' || result === 'Permission is required!' || result === 'Token generation failed!') {
            return res.status(400).send({
                error: result
            });
        }
        if (result === "Account Already Exist") {
            return res.status(409).send({
                error: result
            });
        }
        return res.status(201).send({message: 'User Created successful!', user: result});
    } catch (error) {
        console.error(error);
        return res.status(400).send(error.message)
    }
});

//                      Get Live Diagnostics
router.get("/admin/live_diag", async (req,res) =>{
  try {
    const result = await userServices.getDiagnostics();
    if(result === 'No diagnostics exists!'){
        return res.status(404).send({
            error: result
        });
    }
    res.status(200).send(result);
  } catch (error){
    res.status(400).send(error.message)
  }
});





    // Function to upload Hex Files
    const uploadHexFile = multer({
      limits: {
        fileSize: 1000000,
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(hex)$/)) {
          cb(new Error("Please upload an Hex file"));
        } else {
          cb(null, true);
        }
      },
      });




router.post("/admin/upload", uploadHexFile.single("hex"), async (req, res) => {
  try {
    const payload = {
      file: req.file,
      car: {
        maker: req.body.maker,
        model: req.body.model,
        year: req.body.year,
      }
    };
    const result = await userServices.addCarUpdate(payload);
    if (result === 'Car not found') {
      return res.status(404).send({
        error: result
      });
    }
    if (result === 'No file uploaded.') {
      return res.status(400).send({
        error: result
      });
    }
    res.status(200).send({message:'File uploaded Successfully', car: result});
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router