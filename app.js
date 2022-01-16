const { countReset } = require('console');
const express = require('express');
const joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const {send} = require('process');
app.set('view engine','ejs');

const  allTask = [];

app.get('/allTask' ,(req,res) => {
  res.json(allTask);
    
})

app.get('/allTask/:id', (req,res) => {
  const task = allTask.find(c => c.id === req.params.id);
  if(!task) res.status(404).send("Task wasnt found");
  res.send(task);

});


app.post('/allTask', (req,res) => {
  const schema = joi.object({ 
    task : joi.string().min(3).required()
  })

  const result = schema.validate(req.body);
  if (result.error){
    res.send(400).send(result.error.details[0].message) 
    return;

 };
 const task = {
   id: uuidv4(),
   task : req.body.task,
   status: "done"
 };
 allTask.push(task);
 res.send(task);
  res.send('okay')
});

app.put('/allTask/:id', (req,res) => {
  const task =  allTask.find(c => c.id === req.params.id)
  if(!task) res.status(400).send("task was not found");

  const schema = joi.object({
    task : joi.string().min(3).required()
  })

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return;
}
  task.task = req.body.task;
  res.send(task);


});

app.delete('/allTask/:id', (req,res) => {
  const task =  allTask.find(c => c.id === req.params.id);
  if(!task) res.status(400).send("task was not found");

  const index = allTask.indexOf(task)
  allTask.splice(index,1);
  res.send(task);

})

console.log("the server has started on localhost 8080");
app.listen('8080');

  