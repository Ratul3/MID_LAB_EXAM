var express = require('express');
var userModel = require.main.require('./models/user');
var upload = require('express-fileupload');
var router = express.Router();

router.get('/', function(req, res){
	var username = req.session.username;
		userModel.getByUname(username, function(results){

			res.render('employee/index', { userList : results, uname: req.session.username});
		});
	
});
router.get('/myprofile', function(req, res){


		var username = req.session.username;
		userModel.getByUname(username, function(results){

			res.render('employee/myprofile', { userList : results, uname: req.session.username});
		});

	
});

router.get('/updateprofile/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('employee/updateprofile', {user: result});
	});
	
});

router.post('/updateprofile/:id', function(req, res){
	
	if(req.files){
	var file= req.files.file;
	var filename = file.name;
	if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"){
	file.mv('./assets/'+file.name, function (err){
		if(err)
		{
			res.send(err);
		}
		else{

		var user = {
		username: req.body.username,
		password: req.body.password,
		phone: req.body.phone,
		filename: filename,
		id: req.params.id
	}

 userModel.eupdate(user, function(status){
		if(status){
			res.redirect('/employee/myprofile');
		}else{
			res.redirect('/employee/myprofile');
		}
	});
		}
})
	}
else{
	res.redirect('/employee/updateprofile');

	}
	}
});

module.exports = router;