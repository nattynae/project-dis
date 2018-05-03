const express = require('express')
const database = require('./database.js')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const config = {
    host: 'localhost',
    user: 'root',
    password: 'Spiperafk1', /* your db password here*/
    database: 'reg_data'
};
const db = new database(config);
const currentyear = '2017'
const term = '2'

app.post('/student_reg', (req, res) => { //student login
    let user = req.body.username;
    let pw = req.body.password;
    console.log('receive ' + user, pw, user.length)
    getStudentData(user, pw).then(results => { res.send(results) })
})

app.post('/teacher_reg', (req, res) => { //teacher login
    let user = req.body.username;
    let pw = req.body.password;
    console.log('receive ' + user, pw, user.length)
    getTeacherData(user, pw).then(results => { res.send(results) })
})

app.post('/saveReg', (req, res) => { //save the rigister courses , return 1. cantReg: courseId of the course that fail to reg

    let course = req.body.courseRegist;                        //         2. courseReg: the Success reg courseId in that term
    let sid = req.body.studentId;
    saveNormReg(sid, course).then(results => res.send(results))
})

app.post('/AllregSubject', (req, res) => {   //return all course in all year student has studied/registed
    let sid = req.body.studentId;
    getAllSubjectBySID(sid).then(results => res.send(results))
})

app.post('/getRegSubject', (req, res) => {  //return courses in current term that student has studied/registed
    let sid = req.body.studentId;
    getRegSubjectBySID(sid).then(results => res.send(results))
})

app.post('/getRegNoW', (req, res) => {
    let sid = req.body.studentId;
    getRegSubjectBySIDwithoutW(sid).then(results => res.send(results))
})

app.post('/withdrawSubject', (req, res) => { //withdraw W
    let sid = req.body.studentId;
    let course = req.body.courseWithdraw;
    withDraw(sid, course).then(results => res.send(results))
})

app.post('/addSubject', (req, res) => {     //add
    let course = req.body.courseRegist;
    let sid = req.body.studentId;
    console.log('app course: '+course)
    saveAddReg(sid, course).then(results => res.send(results))
})

app.post('/dropSubject', (req, res) => {    //drop
    let course = req.body.dropCourse;
    let sid = req.body.studentId;
    dropSubject(sid, course).then(results => res.send(results))
})

app.post('/getGrade', (req, res) => {   //get student's grade in all subject he/she had studied (for each subject)
    let sid = req.body.studentId;
    getcourseGrade(sid).then(results => res.send(results))
})

app.post('/getAdvisee', (req, res) => { //get all student that is under teacher advise
    let tid = req.body.teacherId
    getAdvisee(tid).then(results => res.send(results))
})

app.post('/getStudentInCourse', (req, res) => { //get all student that reg the course
    let cid = req.body.CID;
    let year = req.body.academicyear;
    let term = req.body.term;
    getStudentInCourse(cid, year, term).then(results => res.send(results))
})

app.post('/getStudentInSec', (req, res) => {    //get all student that reg the sec
    let cid = req.body.CID;
    let year = req.body.academicyear;
    let term = req.body.term;
    let sec = req.body.secnumber;
    console.log(cid, year, term, sec)
    getStudentInSec(cid, year, term, sec).then(results => res.send(results))
})

app.post('/searchCourse', (req, res) => {  //search for available course
    let cid = req.body.CID;
    let cname = req.body.CEname;
    let ayear = req.body.academicyear;
    let aterm = req.body.term
    searchCourse(cid, cname, ayear, aterm).then(result => res.send(result))
})

app.post('/teachCourse', (req, res) => {    //get all courses that teacher had taught
    let tssn = req.body.teacherId
    getTeachSubject(tssn).then(results => res.send(results))
})

app.post('/saveGrade', (req, res) => {      //not ready yet, for teacher to save student grade
    let { courseGrade } = req.body
    let { CID } = req.body
    let { academicyear } = req.body
    let aterm = req.body.term
    saveGrade(courseGrade, CID, academicyear, aterm).then(result => res.send(result))
})

app.post('/getPayment', (req,res)=>{
    let sid = req.body.studentId
    getPayment(sid).then(result=>res.send(result))
})

app.post('/requestDoc',(req,res)=>{
    let sid = req.body.studentId;
    let doctype = req.body.docType;
    console.log('from post : ' + doctype)
    newdoc(doctype,sid).then(results => { res.send(results)});
})

app.post('/getStatusDoc', (req,res)=>{
    let sid = req.body.studentId;
    getDocStatus(sid).then(results => { res.send(results)});
})



///////////////////////////////////////////////////////////////////

async function newdoc(doctype,sid){
    try{
        if(doctype === '') throw new Error('EMPTY DOCTYPE')
        let ssn = await getStudentSSN(sid)
        await db.query("insert into requestDoc (requestDoc.type,requestDoc.docStatus,requestDoc.Student_SSN) values ('"+doctype+"','WAITING','"+ssn+"')");
        return ({ result: 'success' })
    }catch (e){
        console.log(e)
        return({ result: 'fail' })
    }
}

async function getStudentSSN(sid) {
    console.log('receive sid : ' + sid)
    try {
        return await db.query('SELECT SSN FROM student WHERE SID = ?', sid).then(ssn => ssn[0].SSN)
    } catch (e) {
        console.log('fron getStudentSSN: ' + e)
    }
}

async function getStudentData(sid, pw) {
    try {
        const results = await db.query('SELECT P.password, P.TFname, P.TLname, F.FTname \
                                    FROM student S NATURAL JOIN person P \
                                    NATURAL JOIN faculty F \
                                    where SID= ?', sid)
        if (results.length === 1 && results[0].password === pw) {
            return ({
                valid: 'true',
                Fname: results[0].TFname,
                Lname: results[0].TLname,
                faculty: results[0].FTname
            })
        } else throw new Error('invalid')
    } catch (e) {
        console.log("from getStudentData: " + e)
        return ({ valid: 'false' })
    }
}

async function getTeacherData(tid, pw) {
    try {
        const results = await db.query('SELECT P.password, P.TFname, P.TLname, F.FTname \
                                    FROM teacher T NATURAL JOIN person P \
                                    NATURAL JOIN faculty F \
                                    where T.SSN= ?', tid)
        if (results.length === 1 && results[0].password === pw) {
            return ({
                valid: 'true',
                Fname: results[0].TFname,
                Lname: results[0].TLname,
                faculty: results[0].FTname
            })
        } else throw new Error('invalid')
    } catch (e) {
        console.log("from getTeacherData: " + e)
        return ({ valid: 'false' })
    }
}

async function getRegSubjectBySID(sid) {
    try {
        const ssn = await getStudentSSN(sid)
        const regSubj = await getRegSubjectBySSN(ssn)
        return regSubj;
    } catch (e) {
        console.log('from getRegSubjectBySID :', e)
        return ({ courseRegist: 'error' })
    }
}

async function getRegSubjectBySSN(ssn) {
    try {
        const regSubj = await db.query('SELECT register.CID, CABname, secnumber, credit \
        FROM register NATURAL join course \
        WHERE student_ssn = '+ ssn + ' AND academicyear = ' + currentyear + ' AND term = ' + term + ';')
        if (regSubj.length > 0) {
            return ({ courseRegist: regSubj })
        } else {
            throw new Error('no subject')
        }
    } catch (e) {
        console.log('im sorry, it is me : ' + e)
        return ({ courseRegist: '-' })
    }

}

async function getRegSubjectBySIDwithoutW(sid) {
    try {
        let ssn = await getStudentSSN(sid)
        const regSubj = await db.query('SELECT register.CID, CABname, secnumber, credit \
        FROM register NATURAL join course \
        WHERE student_ssn = '+ ssn + ' AND academicyear = ' + currentyear + ' AND term = ' + term + ' AND grade != "W"')
        if (regSubj.length > 0) {
            return ({ courseRegist: regSubj })
        } else {
            throw new Error('no subject')
        }
    } catch (e) {
        console.log('im sorry, it is me : ' + e)
        return ({ courseRegist: '-' })
    }

}

async function getAllSubjectBySID(sid) {
    try {
        const ssn = await getStudentSSN(sid)
        const regSubj = await getAllSubjectBySSN(ssn)
        return regSubj;
    } catch (e) {
        console.log('from getRegSubjectBySID :', e)
        return ({ courseRegist: 'error' })
    }
}

async function getAllSubjectBySSN(ssn) {
    try {
        const regSubj = await db.query('SELECT register.CID, CABname, secnumber, credit \
        FROM register NATURAL join course WHERE student_ssn = '+ ssn)
        if (regSubj.length > 0) {
            return ({ courseRegist: regSubj })
        } else {
            throw new Error('no subject')
        }
    } catch (e) {
        console.log('im sorry, it is me : ' + e)
        return ({ courseRegist: '-' })
    }

}

async function saveNormReg(sid, course) {
    let cannotReg = [];
    let courseRegist = '';
    try {
        let ssn = await getStudentSSN(sid)
        console.log('what did i get here? : ' + ssn)
        for (let i = 0; i < course.length && course[i].CID != ''; i++) {
            let icourse = course[i]
            try {
                await db.query('INSERT INTO register (student_ssn, CID, academicyear, term,secnumber,reg_status,grade) \
                VALUES ("'+ ssn + '",' + icourse.CID + ',' + currentyear + ',' + term + ',' + icourse.secnumber + ', "WAIT", "X")')
                console.log('regist to : ' + icourse.CID + ' Success')
            } catch (e) {
                cannotReg.push({CID: icourse.CID, error: 'Course is not available.'})
                console.log('regist to : ' + icourse.CID + ' fail')
                console.log(e)
            }
        }
        courseRegist = await getRegSubjectBySSN(ssn).then(re => re.courseRegist)
    } catch (e) {
        console.log('from saveNormReg: ' + e)
    }
    return ({ cantReg: cannotReg, courseRegist });
}

async function saveAddReg(sid, course) {
    console.log('course:'+course)
    let cannotReg = [];
    let courseRegist = '';
    try {
        let ssn = await getStudentSSN(sid)
        console.log('what did i get here??? : ' + ssn)
        for (let i = 0; i < course.length && course[i].CID != ''; i++) {
            let icourse = course[i]
            try {
                let studentNum = await db.query('select maxnumberstudent , currentStudentNumber \
                from section where CID = '+icourse.CID+' and term = '+term+' and academicyear = '+currentyear+' and secnumber = '+icourse.secnumber)
                .then(r=>r[0])
                console.log(studentNum.maxnumberstudent, studentNum.currentStudentNumber)
                if (studentNum.maxnumberstudent < studentNum.currentStudentNumber + 1) throw new Error('course full')
                await db.query('INSERT INTO register (student_ssn, CID, academicyear, term,secnumber,reg_status,grade) \
                    VALUES ("'+ ssn + '",' + icourse.CID + ',' + currentyear + ',' + term + ',' + icourse.secnumber + ', "REGISTED", "X")')
                    console.log('add to : ' + icourse.CID + ' Success')
            } catch (e) {
                let errormes = 'Course had been registed or not available.';
                if(e.message === 'course full') errormes = 'Course fulled';
                cannotReg.push({CID: icourse.CID, error: errormes})
                console.log('add to 2 : ' + icourse.CID + ' fail')
                console.log(e)
            }
        }
        courseRegist = await getRegSubjectBySSN(ssn).then(re => re.courseRegist)
    } catch (e) {
        console.log('from saveAddReg: ' + e)
    }
    return ({ cantReg: cannotReg, courseRegist });
}

async function withDraw(sid, course) {
    try {
        let ssn = await getStudentSSN(sid)
        for (let i in course) {
            let icourse = course[i]
            console.log(icourse)
            await db.query('UPDATE register SET grade = "W" \
                            WHERE student_ssn = '+ ssn + ' AND CID = ' + icourse.CID + ' AND academicyear = ' + currentyear + ' AND\
                            term = '+ term + ';')
            console.log('withdrawn ' + icourse.CID)
        }
        return ({ result: 'success' })
    } catch (e) {
        console.log('from withDraw :' + e)
        return ({ result: 'fail', error: e })
    }
}

async function dropSubject(sid, course) {
    try {
        let ssn = await getStudentSSN(sid)
        for (let i in course) {
            let icourse = course[i]
            console.log(icourse)
            await db.query('DELETE from register \
                            WHERE student_ssn = '+ ssn + ' AND CID = ' + icourse.CID + ' AND academicyear = ' + currentyear + ' AND\
                            term = '+ term + ';')
            console.log('drop ' + icourse.CID)
        }
        return ({ result: 'success' })
    } catch (e) {
        console.log('from dropSubject :' + e)
        return ({ result: 'fail', error: e })
    }
}



async function getcourseGrade(sid) {
    try {
        let ssn = await getStudentSSN(sid)
        let result = await db.query('select r.CID, c.CEname, c.credit, r.academicyear, r.term, r.grade \
        from register r left join course c on r.CID=c.CID \
        where student_ssn = '+ ssn + ' AND r.reg_status = "REGISTED" \
        order by r.academicyear asc,r.term asc')
        let gpax = await db.query('select student.gpax from student where student.ssn = '+ssn).then(r=>r[0])
        let gpa = await db.query('CALL cal_gpa(?)',ssn).then(r=>r[0])
        let ig = 0;
        let pacayear = ''
        let pterm = ''
        let courseGrade = []
        let studentGrade = []
        console.log(result.length)
        for (let i = 0, pacayear = result[0].academicyear, pterm = result[0].term; i < result.length; i++) {
            let cres = result[i]
            console.log(i)
            if (cres.academicyear !== pacayear || cres.term !== pterm) {
                console.log('eiei')
                studentGrade.push({
                    academicyear: pacayear,
                    term: pterm,
                    gpa: ((gpa[ig].academicyear == pacayear && gpa[ig].term == pterm)? gpa[ig++].gpa: '-' ),
                    courseGrade
                })
                courseGrade = []
                pacayear = cres.academicyear
                pterm = cres.term
            }
            courseGrade.push({
                CID: cres.CID,
                CTname: cres.CEname,
                grade: cres.grade,
                credit: cres.credit
            })
            if (i + 1 === result.length) {
              if(ig === gpa.length){
                studentGrade.push({
                  academicyear : pacayear,
                  term: pterm,
                  gpa : '-',
                  courseGrade
                })
              }else{
                studentGrade.push({
                    academicyear: pacayear,
                    term: pterm,
                    gpa: ((gpa[ig].academicyear == pacayear && gpa[ig].term == pterm)? gpa[ig++].gpa: '-' ),
                    courseGrade
                })
              }
            }
        }
        return ({ results: 'success', gpax: gpax.gpax, studentGrade });
    } catch (e) {
        console.log('from getcourseGrade: ' + e)
        return ({ result: 'fail', gpax: '-',studentGrade: [] })
    }
}

async function getAdvisee(tssn) {
    try {
        let student = await db.query('select s.SID, p.TFname, p.TLname, s.gpax \
        from student s left join person p on p.SSN=s.SSN where AdviserSSN='+ tssn)
        return ({ results: 'success', student })
    } catch (e) {
        console.log('from getAdivisee: ' + e)
        return ({ result: 'fail' })
    }
}

async function getStudentInCourse(cid, ayear, aterm) {
    try {
        let student = await db.query('select s.SID, p.TFname, p.TLname, r.secnumber ,r.grade\
        from register r left join person p on r.student_ssn=p.SSN left join student s on p.SSN=s.SSN \
        where r.CID='+ cid + ' and r.academicyear=' + ayear + ' and r.term=' + aterm)
        return ({ result: 'success', student })
    } catch (e) {
        console.log('from getStudentInCourse: ' + e)
        return ({ result: 'fail' })
    }
}

async function getStudentInSec(cid, ayear, aterm, sec) {
    try {
        let student = await db.query('select s.SID, p.TFname, p.TLname, r.secnumber ,r.grade\
        from register r left join person p on r.student_ssn=p.SSN left join student s on p.SSN=s.SSN \
        where r.CID='+ cid + ' and r.academicyear=' + ayear + ' and r.term=' + aterm + ' and r.secnumber=' + sec)
        return ({ result: 'success', student })
    } catch (e) {
        console.log('from getStudentInCourse: ' + e)
        return ({ result: 'fail' })
    }
}

async function searchCourse(cid, cname, ayear, aterm) {
    try {
        let course = await db.query('CALL searchByCIDCnAcYT("' + cid + '","' + cname + '",' + ayear + ',' + aterm + ')').then(result => result[0])
        let response = []
        let data = []
        let pcid = ''
        console.log(course.length)
        for (let i = 0, pcid = course[0].CID; i < course.length; i++) {
            let icourse = course[i]
            if (icourse.CID !== pcid) {
                response.push({
                    CID: course[i - 1].CID,
                    CEname: course[i - 1].CEname,
                    credit: course[i - 1].credit,
                    data
                })
                data = []
                pcid = icourse.CID
            }
            data.push({
                secnumber: icourse.secnumber,
                starttime: icourse.starttime,
                endtime: icourse.endtime,
                TFname: icourse.TFname,
                Sday: icourse.Sday,
                currentNumberStudent: icourse.currentStudentNumber,
                maxnumberstudent: icourse.maxnumberstudent,
                BABname: icourse.BABname,
                roomNumber: icourse.roomnumber
            })
            if (i + 1 === course.length) {
                response.push({
                    CID: icourse.CID,
                    CEname: icourse.CEname,
                    credit: icourse.credit,
                    data
                })
            }
        }
        return ({ result: 'success', response })
    } catch (e) {
        console.log('from searchCourse: ' + e)
        return ({ result: 'fail' , response : []})
    }
}

async function getTeachSubject(tssn) {
    try {
        let course = await db.query('SELECT S.CID, C.CABname, S.academicyear, S.term, S.secnumber\
        FROM teach S NATURAL JOIN course C WHERE S.teacher_ssn ='+ tssn)
        return ({ result: 'success', course })
    } catch (e) {
        console.log('from getTeachSubject: ', e)
        return ({ result: 'fail', course: [] })
    }
}

async function saveGrade(sg, cid, ayear, aterm) {
    try {
        console.log(sg)
        for (let i = 0; i < sg.length; i++) {
            let isg = sg[i]
            console.log('grade = ', isg.grade)
            let ssn = await getStudentSSN(isg.SID)
            await db.query('UPDATE register SET grade = "' + isg.grade
                + '" WHERE student_ssn =' + ssn + ' AND CID = ' + cid + ' AND academicyear = ' + ayear + ' AND term = ' + aterm)
        }
        return ({ result: 'success' })
    } catch (e) {
        console.log('from saveGrade : ', e)
        return ({ result: 'fail' })
    }
}

async function getPayment(sid) {
    try {
        let ssn = await getStudentSSN(sid)
        let payment = await db.query('select paydate, academicyear, term, tuitionfee, status from pay NATURAL JOIN department where student_ssn = ?', ssn)
        return ({result: 'success', payment})
    } catch (e) {
        return ({result: 'fail', payment: []})
        console.log('from getPayment : ', e)
    }
}
async function getDocStatus(sid){
    try{
        let ssn = await getStudentSSN(sid)
        let docStatus = await db.query('select timestamp, docStatus, type from requestDoc where Student_SSN ='+ssn)
        return ({result: 'success', docStatus})
    }catch(e){
        console.log(e)
        return ({result: 'fail' , docStatus: []})
    }
}



app.listen(8000, () => console.log('Server is running on port 8000!'))
