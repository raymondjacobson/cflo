exports.processData = function(){
  var PythonShell = require('python-shell');
  PythonShell.run('algorithm/ex.py')
}
