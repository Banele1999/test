var express = require("express")
const router = express.Router();
const multer = require('multer')
const path = require('path');
var mysql = require('mysql')
var mysqlConnection = require('../config/connection');
var fs = require("fs");
const bcrypt = require('bcrypt')
const session = require('express-session');


const strongPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;



//admin registration
// router.post('/admin/register', (req, res) => {
//     //console.log(req.body);
//     const {name,surname,email,password,passwordConfirm,Admin_id} = req.body;

//     mysqlConnection.query('SELECT email FROM admin where email = ?', [email], async (error, results)=>{
//         if(error){
//             console.log(error)
//         }
//          if(results.length > 0){
//             return res.json({
//                 success: false,
//                 message: "email already exist"
//             })

//         }else if(password !== passwordConfirm){
//             return res.json({
//                 success: false,
//                 message: "password does not match"
//             })
//         }else{
//         let hashedPassword = await bcrypt.hash(password, 8);

//         mysqlConnection.query('INSERT INTO admin SET ?',{name: name,surname :surname,email: email,password: hashedPassword,Admin_id:Admin_id},(error, results) =>{
//             if(error){
//                 console.log(error)
//             }else{
//                 return res.json({
//                     success: true,
//                     message: "successfully registered"
//                 })
//                 console.log(results);
//         }   
//      });
//     }
//     })  
// })

router.post('/admin/registration', (req, res) => {
    const { name, surname, email, password, passwordConfirm } = req.body;

    if (!strongPass.test(password)) {
        return res.json({
            success: false,
            message: "Please enter a Strong Password"
        });
    }
    mysqlConnection.query('SELECT email FROM admin WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.json({
                success: false,
                message: "Email already exists."
            });
        } else if (password !== passwordConfirm) {
            return res.json({
                success: false,
                message: "Passwords do not match."
            });
        } else {
            let hashedPassword = await bcrypt.hash(password, 8);

            mysqlConnection.query('INSERT INTO admin SET ?', { name: name, surname: surname, email: email, password: hashedPassword }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    return res.json({
                        success: true,
                        message: "Successfully registered."
                    });
                    console.log(results);
                }
            });
        }
    });
});

//Admin login
router.post('/admin/login', (req, res) => {
    const { email, password } = req.body;

    mysqlConnection.query('SELECT * FROM admin where email = ?', [email], (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            //console.log(results[0])
            bcrypt.compare(password, results[0].password, (error, response) => {
                if (error) {
                    return res.json({
                        success: false,
                        message: "error comparing"
                    });
                }

                if (response) {
                    const user = {
                        Admin_id: results[0].Admin_id,
                        name: results[0].name,
                        surname: results[0].surname

                    }
                    //req.session.userId = Admin_id;

                    return res.json({
                        success: true,
                        results,
                        user,
                        message: "Welcome " + user.name + ' ' + user.surname
                    });
                } else {
                    return res.json({
                        success: false,
                        message: "password does not match"
                    });
                }
            });
        } else {
            return res.json({
                success: false,
                message: "email does not exist"
            });
        }
    });
});


//tryng to authentiate judge
/*const authenticateJugde = (req, res, next) => {
  if (req.session.userId) {
    // Judge is logged in, proceed to the next middleware or route handler
    next();
  } else {
    res.json({
      success: false,
      message: 'Judge not logged in'
    });
  }
};
//end of authentication
//trying authenticating hacker
const authenticateHacker = (req, res, next) => {
  if (req.session.userId) {
    // Hacker is logged in, proceed to the next middleware or route handler
    next();
  } else {
    res.json({
      success: false,
      message: 'Hacker not logged in'
    });
  }
};*/
//end of authenticating


//judge registration
router.post('/judge/registration', (req, res) => {
    // console.log(req.body);
    const { judge_id, judge_name, judge_surname, email, company_name, password, passwordConfirm, Admin_id } = req.body;

    if (!strongPass.test(password)) {
        return res.json({
            success: false,
            message: "Please enter a Strong Password"
        });
    }

    mysqlConnection.query('SELECT email FROM  judge where email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            res.json({
                success: false,
                message: "email already exist"
            })

        } else if (password !== passwordConfirm) {
            res.json({
                success: false,
                message: "password does not match"
            })
        } else {
            let hashedPassword = await bcrypt.hash(password, 8);
            //var count = 0;
            mysqlConnection.query('INSERT INTO judge SET ?', { judge_id: judge_id, judge_name: judge_name, judge_surname: judge_surname, email: email, company_name: company_name, password: hashedPassword, Admin_id: Admin_id }, (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    
                    res.json({
                        success: true, results,
                        message: "successfully registered"

                    })
                    console.log(results);
                }
            });
        }
    })
})

//judge login
router.post('/judge/login', (req, res) => {
    //console.log(req.body);

    const { email, password } = req.body;

    mysqlConnection.query('SELECT * FROM judge where email = ?', [email], (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (error, response) => {
                if (error) {
                    res.json({
                        success: false,
                        message: "error comparing"
                    })
                }
                if (response) {
                    const user = {

                        judge_id: results[0].judge_id,
                        judge_name: results[0].judge_name,
                        judge_surname: results[0].judge_surname

                    }
                    res.json({
                        success: true,
                        results,
                        user,
                        message: "Welcome " + user.judge_name + ' ' + user.judge_surname
                    })
                } else {
                    res.json({
                        success: false,
                        message: "password does not match "
                    })
                }
            })
        } else {
            res.json({
                success: false,
                message: "email does not exist"
            })
        }
    })
})

//getting all registerd judges
router.get('/judge/judges', (req, res) => {
    mysqlConnection.query("SELECT judge_name,judge_surname,judge_id AS judges FROM judge ORDER BY judge_id  asc", (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results,
            })
        }
    });
});



//hackers  registration
//trying to authenticate

/*const authenticateAdmin = (req, res, next) => {
    if (req.session.userId) {
      // Admin is logged in, proceed to the next middleware or route handler
      next();
    } else {
      res.json({
        success: false,
        message: 'Admin not logged in'
      });
    }
  };*/

router.post('/hacker/registration', (req, res) => {
    console.log(req.body);
    const { group_id, stu_no, stu_name, stu_surname, email, password, passwordConfirm, group_name, Admin_id } = req.body;
    //const Admin_id = req.session.userId;
    if (!strongPass.test(password)) {
        return res.json({
            success: false,
            message: "Please enter a Strong Password"
        });
    }

    mysqlConnection.query('SELECT email FROM  hacker where email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            res.json({
                success: false,
                message: "email already exist"
            })

        } else if (password !== passwordConfirm) {
            res.json({
                success: false,
                message: "password does not match"
            })
        } else {
            let hashedPassword = await bcrypt.hash(password, 8);

            mysqlConnection.query('INSERT INTO hacker SET ?', { group_id: group_id, stu_no: stu_no, stu_name: stu_name, stu_surname: stu_surname, email: email, group_name: group_name, password: hashedPassword, Admin_id: Admin_id }, (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    res.json({
                        success: true, results,
                        message: "successfully registerd"
                    })
                    //console.log(results);
                }
            });
        }
    })
})


//hackers login
router.post('/hacker/login', (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    mysqlConnection.query('SELECT * FROM hacker where email = ?', [email], (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (error, response) => {
                if (error) {
                    res.json({
                        success: false,
                        message: "error comparing"
                    })
                }
                if (response) {
                    const user = {
                        group_id: results[0].group_id,
                        group_name: results[0].group_name

                    }
                    res.json({
                        success: true,
                        results,
                        user,
                        message: "Welcome " + user.group_name + ' TEAM'
                    })
                } else {
                    res.json({
                        success: false,
                        message: "password does not match "
                    })
                }
            })
        } else {
            res.json({
                success: false,
                message: "email does not exist"
            })
        }
    })
})

//getting teams
router.get('/team/names', (req, res) => {
    mysqlConnection.query("SELECT group_name AS team FROM hacker ORDER BY group_id  asc", (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results,
            })
        }
    });
});
//uploading filles

const storage = multer.diskStorage({
    destination: './src/pdfs/',
    filename: (req, file, cb) => {
        // return cb(null, '${file.filename}_${Date,now()}${path.extname(file.originalname)}')
        return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

router.post('/upload/files', upload.single('filename'), (req, res) => {
    const file_id = req.body;
    const name = req.file.filename;
    const group_id = req.body;
    const size = req.file.size / (1024 * 1024);
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString();
    const format = path.extname(name);
    console.log(format);

    mysqlConnection.query('INSERT INTO file SET ?', { file_id: file_id, name: name, size: size, format: format, date: date, time: time, group_id: group_id }, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            let pdfFK = results.insertId
            console.log(pdfFK)
            res.json({
                success: true, results,
                message: " pdf inserted ",

            })
        }
    })
})

// getting all uploaded files
router.get('/files', (req, res) => {
    mysqlConnection.query('SELECT * FROM file ORDER BY file_id desc', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results,
            })
        }
    });
});

//getting one file

router.get('/files/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM file WHERE file_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//assigning points to team

router.post('/team/points', (req, res) => {
    const { points_id, group_name, points, isPublished = false, judge_id } = req.body;
    mysqlConnection.query("insert into team set ?", { points_id: points_id, group_name: group_name, points: points, isPublished: isPublished, judge_id: judge_id }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json({
                success: true, results,
            })
        }
    })
})

//all teams with their points
router.get('/team', (req, res) => {
    mysqlConnection.query('SELECT group_name,FORMAT(sum(points)/count(judge.judge_id),0) as total from team,judge where team.judge_id = judge.judge_id group by group_name HAVING(total)', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results,
            })
        }
    });
});

//publishing resulits

router.get('/publishing', (req, res) => {
    mysqlConnection.query('SELECT group_name,isPublished,FORMAT(sum(points)/count(judge.judge_id),0) as total from team,judge where team.judge_id = judge.judge_id group by group_name HAVING sum(points)and isPublished=false ORDER BY total DESC', (err, results, fields) => {
        if (!err)
            res.json({
                success: true, results,
            })
        //res.send(rows);

        else
            console.log(err);
    })
})
router.put('/publishing/update', (req, res) => {
    mysqlConnection.query('UPDATE team SET isPublished = true WHERE isPublished = false', (err, results, fields) => {
        if (!err)
            res.json({
                success: true, results,
            })
        //res.send(rows);

        else
            console.log(err);
    })
})
router.get('/published', (req, res) => {
    mysqlConnection.query('SELECT group_name,isPublished,FORMAT(sum(team.points)/count(judge.judge_id),0) as total from team,judge where team.judge_id = judge.judge_id group by group_name HAVING sum(points) AND isPublished= true ORDER BY total DESC', (err, results, fields) => {
        if (!err)
            res.json({
                success: true, results,
            })
        //res.send(rows);
        else
            console.log(err);
    })
})
router.put('/publishing/update/change', (req, res) => {
    mysqlConnection.query('UPDATE team SET isPublished = false WHERE isPublished = true', (err, results, fields) => {
        if (!err)
            res.json({
                success: true, results,
            })
        //res.send(rows);

        else
            console.log(err);
    })
})



//updating to true
/*
router.put('/publishing/updating',(req,res)=>{
    mysqlConnection.query("select isPublished from team",(err,results,fields)=>{
        console.log(results)
        if(results.isPublished == false){
            mysqlConnection.query('UPDATE team SET isPublished = true WHERE isPublished = false',(err,results,fields)=>{
                if(!err)
                res.json({
                    success: true, results, 
                }) 
                //res.send(rows);
               
                else
                console.log(err);
            })
        }else if(results.isPublished == true){
            mysqlConnection.query('UPDATE team SET isPublished = false WHERE isPublished = false',(err,results,fields)=>{
                if(!err)
                res.json({
                    success: true, results, 
                }) 
                //res.send(rows);
               
                else
                console.log(err);
            })
        }
    })
  
})

*/

// assigning judge slots

router.post('/judge/slot', (req, res) => {
    const { slot_id, judge_name, start_time, length, end_time, date, Admin_id } = req.body;

    mysqlConnection.query("insert into judgeslot set ?", { slot_id: slot_id, judge_name: judge_name, start_time: start_time, length: length, end_time: end_time, date: date, Admin_id: Admin_id }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json({
                success: true, results,
                message: " judge time slot Successfully inserted"
            })
        }
    })
})

//all assigned slotes for judges

router.get('/judge/slot', (req, res) => {
    mysqlConnection.query('SELECT * FROM judgeslot ORDER BY slot_id desc', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results,
            })
        }
    });
});


//hacker slotes

router.post('/hacker/slot', (req, res) => {
    const { slot_id, group_name, start_time, length, end_time, date, Admin_id } = req.body;

    mysqlConnection.query("insert into hackerslot set ?", { group_name: group_name, start_time: start_time, length: length, end_time: end_time, date: date, Admin_id: Admin_id }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json({
                success: true, results,
                message: " hacker time slot Successfully inserted"
            })
        }
    })
})

//all assigned slotes for hacker

router.get('/hacker/slot', (req, res) => {
    mysqlConnection.query('SELECT * FROM hackerslot ORDER BY slot_id desc', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results,
            })
        }
    });
});
/*var mystring = "SELECT DISTINCT admin.name,admin.surname,judge.judge_name,judge.judge_surname,judge.company_name ,hacker.group_name,FORMAT(sum(points)/count(team.judge_id),0)
From admin,hacker,team,judge 
Where admin.Admin_id = hacker.Admin_id AND hacker.Admin_id = judge.Admin_id AND judge.judge_id = team.judge_id AND hacker.group_name = team.group_name
group BY hacker.group_name 
HAVING sum(points)/count(team.judge_id) 
ORDER by sum(points)/count(team.judge_id) DESC"*/



router.get('/report', (req, res) => {
    mysqlConnection.query('SELECT DISTINCT admin.name,admin.surname,judge.judge_name,judge.judge_surname,judge.company_name ,hacker.group_name,FORMAT(sum(points)/count(judge.judge_id),0)AS points,DATE_FORMAT(SYSDATE() , "%W %M %e %Y") AS time From admin,hacker,team,judge Where admin.Admin_id = hacker.Admin_id AND hacker.Admin_id = judge.Admin_id AND judge.judge_id = team.judge_id AND hacker.group_name = team.group_name group BY hacker.group_name HAVING sum(points)/count(judge.judge_id) ORDER by sum(points)/count(judge.judge_id) DESC', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results,
                //console.log(results)
            })
        }
    })
})
router.get('/time', (req, res) => {
    mysqlConnection.query('SELECT DATE_FORMAT(SYSDATE(), "%W %M %e %Y")', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.json({
                success: true, results
            })
        }
    })
})

module.exports = router;
