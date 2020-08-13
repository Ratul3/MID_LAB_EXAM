var express = require('express');
var router = express.Router();
var db = require.main.require('./models/db');
var userModel = require.main.require('./models/user');

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/', function(req, res){
res.render('admin/index');

});

router.get('/addemployee', function(req, res){
	
		res.render('admin/addemployee');
	
});

router.post('/addemployee', function(req, res){
	
	

		var user ={
			ename 		: req.body.ename,
			epassword	: req.body.epassword,
			ephone		: req.body.ephone
		}

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/admin');
			}else{
				res.redirect('/admin');
			}
		});
	
});
router.get('/allemployeelist', function(req, res){
	
	
		userModel.employee(function(results){
			res.render('admin/allemployeelist', { results : results, uname: req.session.username});
		});
	
});
router.get('/update/:id', function(req, res){

	userModel.get(req.params.id, function(result){
		res.render('admin/update', {user: result});
	});
	
});

router.post('/update/:id', function(req, res){
	
		var user = {
		ename: req.body.ename,
		epassword: req.body.epassword,
	    ehone: req.body.ephone,
		id: req.params.id
	};

 userModel.update(user, function(status){
		if(status){
			res.redirect('/admin/allemployeelist');
		}else{
			res.redirect('/admin/allemployeelist');
		}
	});
	
});
router.get('/delete/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('admin/delete', {user: result});
	});

});

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/admin/allemployeelist');
		}else{
			res.redirect('/admin/allemployeelist');
		}
	});
	
});


module.exports = router;


