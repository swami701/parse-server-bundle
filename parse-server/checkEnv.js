function checkForDefined(value) {
  if (typeof process.env[value] === 'undefined') {
    console.log('Environment variable ' + value + ' not set');
  }
}

module.exports = function () {
  var envVariables = [
    "APP_ID",
    "DATABASE_URI",
    "MASTER_KEY",
    "VERBOSE"
  ];

  for (var i = 0; i < envVariables.length; i++) {
    checkForDefined(envVariables[i]);
  }
};