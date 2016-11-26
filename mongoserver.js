var express = require('express');
var bp = require('body-parser');
var _ = require('underscore')

var MongoClient=require('mongodb').MongoClient

var app = express();
app.use(bp.json());
app.use(express.static('public'));

var db

MongoClient.connect('mongodb://admin:admin@ds111178.mlab.com:11178/sadb',(err ,database)=>{
                
                if(err)return console.log(err)
                                db=database
})

var tasks = [
{
  description:'Go to market',
  status: true
},
{
  description:'Meet friends',
  status: true
}];

app.get('/getTasks', function(req, res) {
  res.json(tasks);
});

var pushTasks=[];
var tasks=0;
app.post('/posttask',(req,res)=> {
                db.collection('usertable').save(req.body,(err,result)=>{
                                if(err)return console.log(err)
                                                console.log('saved to db')
                })
                
   // var data = req.body;
    //data.id = tasks++;
    //pushTasks.push(data);
   //res.json(data);
});

app.delete('/deleteTask/:id', (req, res)=> {
    
                db.collection('usertable').findOneAndDelete({description:req.body.description},(err,result)=>{
                if(err)return res.send(500,err)
                                                res.send('record deleted')           
                })
                
                                
                
});


app.get('/todos/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  console.log(todoId);
  console.log(JSON.stringify(pushTasks));
  var matchedTodo = _.findWhere(pushTasks, {id:todoId});
  /*var matchedTodo;
  pushTasks.forEach(function(todo) {
     if(todoId === todo.id) {
        matchedTodo = todo;
     }
  });*/
  if (matchedTodo) {
    res.json(matchedTodo);
  }
  else {
    res.status(404).send();
  }
}) ;

app.put('/updatedata', (req, res)=> {
    
                db.collection('usertable').findOneAndUpdate({description:req.body.description},{
                                $set:{
                                                description:req.body.description,
                                                completed:req.body.completed
                                                
                                }
                },
                {
                sort:{id: -1},
                upsert:true
    },
     (err,result)=>{
                if(err)return res.send(err)
                                                res.send(result)               
                })
                
                                
                
});


app.listen(3000, function() {
   console.log('app is running on port 3000');
})








