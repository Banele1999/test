var express = require("express");
//const Connection = require("mysql/lib/Connection");
const router = express.Router();
var connection = require('../config/connection');

router.post("/submit_score", (req, res) => {
    var novality = req.body.novality * 0.15;
    var usefulness = req.body.usefulness * 0.20;
    var feasibility = req.body.feasibility * 0.15;
    var technical_proficiency = req.body.technical_proficiency * 0.15;
    var impact = req.body.impact * 0.25;
    var safety = req.body.safety * 0.10

    var total = novality + usefulness + feasibility + technical_proficiency + impact + safety
    var score_body = [novality, usefulness, feasibility, technical_proficiency, impact, safety, total, req.body.comment, req.body.team_id, req.body.judge_id]
    var sql_score = `INSERT INTO score(novality,usefulness,feasibility,technical_proficiency,impact,safety,total,comment,team_id,judge_id)
     VALUES(? ,? ,? ,? ,? ,? ,? ,? , ?, ?)`

    connection.query(sql_score, score_body, (err, results) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(results)
        if (results.affectedRows > 0) {
            res.send({ success: true, message: 'Score results sent successfully!', total })
        }
        else {
            res.send({ success: false, message: 'Could not send the scoce results!' })
        }
    })

})

router.get('/teams',(req, res)=>{
    var sql = `SELECT * FROM team`
    
    connection.query(sql, (err, results)=>{
        if(err) console.log(err)
        if(results.length > 0){
            res.send({success:true, results})
        }
        else{
            res.send({success:false, message:"no team found"})
        }
    })
})

// gets the SCORES
router.get('/get_scores', (req, res) => {
    var sql = `SELECT s.total, s.comment, s.team_id, judge_name,judge_surname, group_name
                FROM    score s, team t, judge j
                Where   s.team_id = t.team_id
                AND     j.judge_id = s.judge_id
                ORDER BY group_name;`

    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            throw err
        }
        if (results.length > 0) {
            res.send({ results, success: true })
        }
        else {
            res.send({ success: false, message: 'Results not published yet' })
        }
    })
})

// gets the AVERAGE
router.get('/get_all_results', (req, res) => {
    var sql = `SELECT AVG(total) average, s.team_id, COUNT(judge_id), group_name
            FROM score s, team t
            where s.team_id = t.team_id
            GROUP by team_id
            ORDER BY average DESC;`

    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            throw err
        }
        if (results.length > 0) {
            res.send({ results, success: true })
        }
        else {
            res.send({ success: false, message: 'Results not published yet' })
        }
    })
})


router.get('/get_all_report', (req, res) => {
    var sql = `SELECT name,surname,judge_name,judge_surname, company_name,group_name,total
    From admin a, judge j,score s,team t
    Where a.Admin_id = j.Admin_id
    And   t.team_id = s.team_id;`
    

    connection.query(sql, (err, report) => {
        if (err) {
            console.log(err)
            throw err
        }
        if (report.length > 0) {
            res.send({ report, success: true })
        }
        else {
            res.send({ success: false, message: 'Report not published yet' })
        }
    })
})

module.exports = router;