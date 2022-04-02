const express = require("express");
const router = express.Router();
const dbConfig = require("../../config/db.config.js");
const multer = require('multer');

router.get("/",(req,res)=>{
    const mysql = require('mysql2')
    const con = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB
    })
    
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM images", function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });  
    });   
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const original = file.originalname; //original name yg di upload
      const ext = original.substr(original.length - 5);//ambil 5 string terakhir pasti itu sudah termasuk extension
      const regex = /[^\w\s]/g;//temukan selain word/kata atau whitepsace
      const dot = ext.search(regex);
      cb(null, uniqueSuffix + ext.substr(dot));//ambil setelah . sebagai extension
    }
});
  
const fileFilter = (req, file, cb) => {
    // jika jpg dan png maka di terima, selain itu riject
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
  
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

router.post("/", upload.single('productImage'), (req, res, next) => {
  const productImage = req.file.filename

  const mysql = require('mysql2')
  const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  })

  con.query(`INSERT INTO images(name)VALUES(${productImage})`,function(err, rows, fields){
  })
  console.log("succed");
  res.send("succed");
})

module.exports = router;