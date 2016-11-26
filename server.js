var express =require('express');
var bp=require('body-parser');
var _=require('underscore')

var app=express();
app.use(bp.json());

app.use(express.static('public'));

var mytasks =[]
var taskid=1;

app.get('/getmytasks',function(req,res)
{
	res.json(mytasks);
});
app.post('/postmytasks',function(req,res){
	
	var data=req.body;
	data.id=taskid++;
	mytasks.push(data);
	res.json(data);
});

app.get('/getmytasks/:id',function(req,res){
	var todoId =parseInt(req.params.id,10);
	var matchTodo=_.findWhere(mytasks,{id:todoId});

	if(matchTodo)
	{
		res.json(matchTodo);
	}
	else{
		res.static(404).send();
	}
});
app.delete('/deletedata/:id',function(req,res){
	var todoId =parseInt(req.params.id,10);
	var matchTodo=_.findWhere(mytasks,{id:todoId});

	if(!matchTodo)
	{
		res.static(404).json({"error":"id not found"});
		
	}
	else{
		mytasks=_.without(mytasks,matchTodo);
		res.json(matchTodo);
	}
});




app.listen(3000,function(){
	
	console.log('app is running on port 3000');
	
});