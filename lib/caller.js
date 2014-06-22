exports.processData = function(){
  var spawn = require('child_process').spawn,
    pythonProcess = spawn('python', ['lib/algorithm/ex.py']);
  pythonProcess.stdout.on('data', function(data) {
     console.log('stdout: ' + data);
  });
  pythonProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });
}
