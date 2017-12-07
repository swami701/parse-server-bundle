var express = require('express');
var ParseDashboard = require('parse-dashboard');

var config = require('./parse-dashboard-config.json');

/* Add config.allowInsecureHTTP in the second parameter so Parse will
 * not complain that it's not running in HTTPS mode.
 */
var dashboard = new ParseDashboard(config, config.allowInsecureHTTP);

var app = express();
var mountPath = process.env.MOUNT_PATH || "";
// make the Parse Dashboard available at /dashboard
app.get('/health', (req, res) => {
  res.status(200).send({
    statusCode: 200,
    message: 'Dashboard is healthy!'
  });
});
app.use('/' + mountPath, dashboard);

var httpServer = require('http').createServer(app);
var port = process.env.PORT || 4040;
httpServer.listen(port, function() {
  console.log("Dashboard listening on " + port + "!");
});
