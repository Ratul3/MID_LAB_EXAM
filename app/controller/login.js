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
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(status){
			req.session.username = user.uname;
			res.redirect('/admin');
		}else{
			res.send('invalid username/password');
		}
	});

});

module.exports = router;