const mongoose = require('mongoose');
const express = require('express');
const app = express();
const tpo = require('./routes/regtpo')
const logtpo = require('./routes/logtpo');
const logstu = require('./routes/logstu');
const logcmpny = require('./routes/logcmpny');
const stu = require('./routes/regstu');
const cmpny = require('./routes/regcmpny');
const drive = require('./routes/drive');


mongoose.connect('mongodb://localhost/tnp',{config: {autoIndex: false}})
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB...'))

app.use(express.json());

//for getting uploaded resume/images write path in browser as 
//http://localhost:3000/uploads/fileName(similar in uploads folder)
app.use('/uploads',express.static('uploads'));

//for downloading uploaded xlsx write path in browser as 
//http://localhost:3000/uploads/fileName(similar in public folder)
app.use('/public',express.static('public'));

app.use('/api/tpo', tpo);
app.use('/api/stu', stu);
app.use('/api/cmpny', cmpny);
app.use('/api/logtpo',logtpo);
app.use('/api/logstu',logstu);
app.use('/api/logcmpny',logcmpny);
app.use('/api/drive', drive);


const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

