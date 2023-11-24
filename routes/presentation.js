var express = require("express");
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
            var sql_slot = `update slot
                            set is_judged = ?
                            where team_id = ?
                            and judge_id = ?`
            var slot_body = [true, req.body.team_id, req.body.judge_id]
            connection.query(sql_slot, slot_body, (error, rows) => {
                if (error) {
                    console.log(error)
                    throw error
                }
                else {
                    if ((rows.affectedRows > 0)) {
                        res.send({ success: true, message: 'Score results sent successfully!', total })
                    }
                    else {
                        res.send({ success: false, message: 'Could not send the scoce results!' })
                    }
                }
            })
        }
        else {
            res.send({ success: false, message: 'Could not send the scoce results!' })
        }
    })

})

router.get('/teams/:judge_id', (req, res) => {
    var sql = `SELECT t.team_id, group_name
                FROM team t, slot s
                WHERE t.team_id = s.team_id
                AND is_judged = false
                AND s.judge_id = ?;`

    connection.query(sql, [req.params.judge_id], (err, results) => {
        if (err) console.log(err)
        if (results.length > 0) {
            res.send({ success: true, results })
        }
        else {
            res.send({ success: false, message: "no team found" })
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

router.post('/register_judges', (req, res) => {

    var sql_check_email = 'select * from judge where email =?'
    connection.query(sql_check_email, req.body.email, async(err, results) => {
        if (err) {
            console.log(err)
        }
        if (results.length > 0) {
            res.json({
                success: false,
                message: "email already exist"
            })
        }
        else {
            let hashedPassword = await bcrypt.hash(req.body.password, 8);
            var register_body = { judge_name: req.body.judge_name, judge_surname: req.body.judge_surname, email: req.body.email, company_name: req.body.company_name, password:hashedPassword , Admin_id: req.body.Admin_id }
            connection.query('INSERT INTO judge SET ?', register_body, (err, results) => {
                if (err) {
                    console.log(err);
                    throw err
                }
                if (results.affectedRows > 0) {
                    var sql = 'select * from team'
                    var judge_assign = "and assigned to all teams"
                    connection.query(sql, (err, rows) => {
                        if (err) console.log(err)
                        if (results.affectedRows > 0) {

                            var judge_id = results.insertId;
                            for (var k = 0; k < rows.length; k++) {
                                var slot_sql = `INSERT INTO slot(team_id, judge_id, is_judged)
                                             VALUES(?,?,?)`
                                connection.query(slot_sql, [rows[k].team_id, judge_id, false], (err, row) => {
                                    if (err) console.log(err)
                                    if (row.affectedRows > 0) {
                                    }
                                })
                            }
                        }
                        else{
                            judge_assign = "and not assigned to teams"
                        }
                    })
                    res.send({ message: "Registered judge successfully "+judge_assign, success: true })
                }
                else {
                    res.send({ message: "could not register judge", success: false })
                }


            })
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