exports.processData = function(){
  var processedData
    , spawn = require('child_process').spawn,
    pythonProcess = spawn('python', ['lib/algorithm/ex.py']);
  pythonProcess.stdout.setEncoding('utf8');
  pythonProcess.stdout.on('data', function(data) {
    console.log(data);
    processedData = data;
  });
  pythonProcess.stderr.on('data', function (data) {
    console.log('error loading python: ' + data);
  });
  console.log(processedData);
  return processedData;
}
