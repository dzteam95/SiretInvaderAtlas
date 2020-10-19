# process.hrtime

easily parse the return of `hrtime` method from `process` module into second/milisecond/microsecond/namisecond

```
var hrtime = require('process.hrtime');
var start = hrtime();

setTimeout(function () {
	console.log(hrtime(start));
	console.log(hrtime(start, 's') + ' s'); // 0.2s
	console.log(hrtime(start, 'ms') + ' ms'); // 200ms
	console.log(hrtime(start, 'us') + ' us'); // 200000 us
	console.log(hrtime(start, 'ns') + ' ns'); // 200000000 ns
}, 200);
```