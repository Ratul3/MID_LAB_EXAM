var express = require('express');

var db = require.main.require('./models/db');
var userModel = require.main.require('./models/user');
var router = express.Router();
router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){

	var user = {
		uname: req.body.uname,
		password: req.body.password,
		type	: req.body.type
	};

userModel.validate(user, function(status){
		if(status){
			
			if(user.type=="admin"){
			req.session.username = user.uname;
			res.redirect('/admin');
			}
			else if(user.type=="employee"){
			req.session.username = user.uname;
			res.redirect('/employee');	
			}
			
			else{
				res.redirect('/login');
			}
		}else{
			res.send('<font color="red"><h2>invalid username/ password/ type</h2></font><a href="/login">Back</a>');
		}
	});

});

module.exports = router;