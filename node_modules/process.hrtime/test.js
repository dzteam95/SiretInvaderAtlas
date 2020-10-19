process.hrtime = null;
var hrtime = require(".");
var start = hrtime();

console.log(hrtime());
console.log(hrtime(null, 's') + ' s');
console.log(hrtime(null, 'ms') + ' ms');
console.log(hrtime(null, 'us') + ' us');
console.log(hrtime(null, 'ns') + ' ns');
setTimeout(function () {
	console.log(hrtime(start));
	console.log(hrtime(start, 's') + ' s');
	console.log(hrtime(start, 'ms') + ' ms');
	console.log(hrtime(start, 'us') + ' us');
	console.log(hrtime(start, 'ns') + ' ns');
}, 200);