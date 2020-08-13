var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('employee/index');
});



module.exports = router;