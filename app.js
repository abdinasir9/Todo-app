
var express = require('express');
var lodash = require('lodash');

let allTask =[
  {
    "task": "bathroom",
    "status": "done"
  },
  {
    "task": "car",
    "status": "not done"
  },
  {
    "task": "laundry",
    "status": ""
  }
]
var app = express();
app.use(express.json());
app.get('/', function (req, res) {
    res.send('hello world')
}) 
app.get('/todo' , function(req,res) {
  res.json(allTask);
    
})
app.post('/todo' , function(req,res) {
  
  allTask.push(req.body)
  console.log(req.task);
  res.send('okay')
})

app.put('/todo', function(req,res){
  const task = req.body.task
  const status = req.body.status
  const index = lodash.findIndex(allTask,{"task":task})
  allTask.splice(index,1,req.body)
  console.log(task)
  res.send('Okay')
})



console.log("the server has started on localhost 8080");
app.listen('8080');

  