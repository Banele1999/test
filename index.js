var express = require("express")
var cors = require("cors")
const multer = require('multer')

var  mysqlConnection = require('./config/connection');
var app=express()
app.use(express.json())
const bcrypt = require('bcrypt')
app.use(cors());


//routes steup
const filesRouter = require('./routes/files')
app.use('/',filesRouter);
app.use('/',require('./routes/presentation'));

// const presentation = require('./routes/presentation')
// app.use('/',presentation);

app.listen(3000, (err) =>{
    if (err){
        console.log(err);
    }else{
        console.log('Express server is runnig at port no : 3000');
    }
})

//*************************************************************** */
// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      // Specify the directory where uploaded files will be stored
      cb(null, 'uploads/');
    },
    filename: function (_req, file, cb) {
      // Specify the filename for the uploaded file
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  // Define a route for file uploads
  app.post('/upload', upload.single('file'), (_req, res) => {
    if (!_req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    // You can access the uploaded file information using req.file
    const { filename, size } = _req.file;
  
    // You can perform further processing here
  
    res.status(200).json({ filename, size });
  });


/*admin reg
{
    "name" : "andries",
    "surname" : "mathenjwa",
    "email": "216840046@tut4life.ac.za",
    "password": "123",
    "passwordConfirm": "123" 
  }
  
  juge reg
{
  "judge_name" : "Fihli",
  "judge_surname" : "Mthimkhulu",
  "email" : "fihli@gmail.com",
  "company_name": "SARS",
  "password" : "123",
  "passwordConfirm" : "123",
  "Admin_id":1
}

hack reg
{

    "stu_name":	"Teboho",
    "stu_no":"123456",
    "stu_surname":"Koena",	
    "email":"123456@GMAIL.COM",
    "group_name":"123"	,
    "password":"123",	
    "passwordConfirm":"123",
    "Admin_id":"1"
}

hacker time slot
{
    "group_name":"TECHS",
    "start_time":"09h00",
    "length": "1hour",
    "end_time":"10h00",
    "date" : "03/06/2023",
    "Admin_id":1 
}

judge slot
{
    "judge_id": 8,
    "judge_name": "Odirile Morolo",
    "start_time": "10h00",
    "length": "3 hours",
    "end_time":"13h00",
    "date":"03/06/2023",
    "Admin_id":1
}
{
    "group_name":"BIBLE"
    "judge_id":10,
    "points"57	
}
{	
    "judge_name":"Andries",
    "start_time":"13H55",	
    "length":2,
    "end_time":"14H00",	
    "date":"2023-07-21",
    "Admin_id":8	
}

	
		

  */

