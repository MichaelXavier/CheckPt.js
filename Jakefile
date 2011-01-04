var exec  = require('child_process').exec,

    expresso_args = ['-I lib', '--timeout 2000'];

function dump(err, sout, serr) {
  if (err)  console.error(err);
  if (sout) console.log(sout);
  if (serr) console.error(serr);
}

desc('Run the test quite (expresso)');
task('test', [], function() {
  exec('expresso', expresso_args, dump);
});

namespace('test', function() {
  desc('Run the test suite with coverage');
  task('coverage', [], function() {
    exec('expresso', expresso_args.concat(['--coverage']), dump);
  });
});
