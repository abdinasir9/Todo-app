
var express = require('express');

let task = []
var app = express();
app.use(express.json());
app.get('/', function (req, res) {
    res.send('hello world')
}) 
 app.get('/todo' , function(req,res) {
   res.json(task);
     
 })
 app.post('/todo' , function(req,res) {
    
    task.push(req.body)
    console.log(req.task);
    res.send('okay')
 })

console.log("the server has started on localhost 8080");
app.listen('8080');

  