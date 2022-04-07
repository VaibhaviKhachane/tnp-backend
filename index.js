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
// const applied = require('./routes/appliedStu');

mongoose.connect('mongodb://localhost/tnp',{config: {autoIndex: false}})
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB...'))

app.use(express.json());
app.use('/uploads',express.static('uploads'))
app.use('/api/tpo', tpo);
app.use('/api/stu', stu);
app.use('/api/cmpny', cmpny);
app.use('/api/logtpo',logtpo);
app.use('/api/logstu',logstu);
app.use('/api/logcmpny',logcmpny);
app.use('/api/drive', drive);
// app.use('/api/apply',applied);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

