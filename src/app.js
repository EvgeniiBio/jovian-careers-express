require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const express = require('express');
const path = require('path');
const app = express();
const JOBS = require('./jobs');
const mustacheExpress = require('mustache-express');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configure mustache
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());



app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'pages/index.html'))
    res.render('index', { jobs: JOBS}); // Render the template
});

app.get('/jobs/:id', (req, res) => {
    const id = req.params.id;
    const matchedJob = JOBS.find(job => job.id.toString() === id);
    res.render('job', { job: matchedJob});
})

const transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',//SMTP host
    port: 465,//SMTP port
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    }
});




const port = process.env.PORT || 3000; 

app.listen(port, () => {console.log(`Server running on https://localhost:${port}`)})