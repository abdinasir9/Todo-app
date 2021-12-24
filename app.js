
const { countReset } = require('console');
const express = require('express');
const Joi = require('joi');
const lodash = require('lodash');
const app = express();
app.use(express.json());
const {send} = require('process');

const  allTask = [
  { id  : 1,
    task: "bathroom",
    status: "done"
  },
  { id  : 2,
    task: "car",
    status: "done"
  },
  { 
    id  :3,
    task: "laundry",
    status: "done"
  }
];

app.get('/', (req, res) => {
    res.send('hello world')
}) 
app.get('/allTask' ,(req,res) => {
  res.json(allTask);
    
})

app.get('/allTask/:id', (req,res) => {
  const task = allTask.find(c => c.id === parseInt(req.params.id));
  if(!task) res.status(404).send("Task wasnt found");
  res.send(task);

});


app.post('/api/allTask', (req,res) => {
  const schema = { 
    task : Joi.string().min(3).required()
} ;
  const result = Joi.validate(req.body,schema);
  if (result.error){
    res.send(400).send(result.error.details[0].message) 
    return;

 };
 const task = {
   id: allTask.length + 1,
   task : req.body.task,
   status: "done"
 };
 allTask.push(task);
 res.send(task);
  allTask.push(req.body)
  console.log(req.task);
  res.send('okay')
});

app.put('/allTask/:id', (req,res) => {
  const task =  allTask.find(c => c.id === parseInt(req.params.id));
  if(!task) res.status(400).send("course cant be found");

  const schema = {
    task : Joi.string().min(3).required()
};

  const result = Joi.validate(req.body,schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return;
}
  task.task = req.body.task;
  res.send(task);


});

app.delete('/allTask/:id', (req,res) => {
  const task =  allTask.find(c => c.id === parseInt(req.params.id));
  if(!task) res.status(400).send("course cant be found");

  const index = allTask.indexOf(task)
  allTask.splice(index,1);
  res.send(task);

})

console.log("the server has started on localhost 8080");
app.listen('8080');

  