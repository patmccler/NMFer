// Example for displaying content in the
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json([{
  	id: 0,
  	username: "patm"
  }, {
  	id: 1,
  	username: "andrewk"
  }, {
		id: 2,
		username: "nickl"
	}]);
});

module.exports = router;
