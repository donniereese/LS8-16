module.exports = function(callback) {
//  require('child_process').exec('./cursor-position.sh', function(error, stdout, stderr) {
//    callback(error, JSON.parse(JSON.stringify(stdout)));
//    //callback(error, stdout);
//  });

  const a = require('child_process').execSync('./tools/ext/bin/cursor-position.sh', {

  });
  return JSON.parse(JSON.stringify(a))
}