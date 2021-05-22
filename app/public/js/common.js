var random = function() {
	var max = 10;
	var min = 2;
	return parseInt(Math.random()*(max-min+1)+min)
}

var getTimeMs = function() {
	var t = new Date();
	return t.getTime();
}

var baseUrl = '/api/';
var token = localStorage.getItem('token')