var express = require('express');

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
};

var app = express();
// подключаем статические файлы :
app.use('/pub',express.static('public'));


app.get('/',function(req,res){
	res.send('hello world');
	console.log(req);
});

app.get('/te*',function(req,res){
	res.send(getKeys(req));
	console.log(req.headers);
});
///отображаем index.html 

app.get('/index.html',function(req,res){
	res.sendFile( __dirname + '/public/index.html');
});

// отвечаем на запрос  из indeх.html 

app.get('/process_get',function(req,res){
//
	response = {
		first_name : req.query.first_name,
		last_name: req.query.last_name
	};
	console.log(response);
	// res.end(response);
	res.end(JSON.stringify(response));
});


// обработка  "http://127.0.0.1:3000/file_upload" method = "POST" 
var fs=require('fs');
var bodyParser=require('body-parser');
var multer=require('multer');

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}).single('file'));
app.use(multer({ dest: '/tmp/'}).any());

app.post('/file_upload',function(req,res){
	// console.log(req);
   // console.log(req);
   console.log(req.files)
   // console.log(req.files.file.originalname);
   console.log(req.files[0].path);
   // console.log(req.files.file.type);
	var file = __dirname + "/" + req.files[0].originalname;
	console.log(file);
	
   fs.readFile(req.files[0].path,function(err,data){

   		fs.writeFile(file, data, function (err) {
   			if (err){
				console.log(err)
			   			}
   			})

     });

	var response = {
		message:'File uploaded successfully',
      	filename:req.files[0].originalname
        };
   console.log(response);
   res.send(JSON.stringify(getKeys(req)) + "\n" );

});

// собственно запускаем объект app. 

var server = app.listen(3000	,function(){
 	host = server.address().address;
 	port = server.address().port;
 	console.log(host);
	console.log('Examples  running %s :%s ', host , port );
});