var express = require('express');
var ParseDashboard = require('parse-dashboard');

/* Add config.allowInsecureHTTP in the second parameter so Parse will
 * not complain that it's not running in HTTPS mode.
 */
const apps = [
  {
    "serverURL": process.env.SERVER_URL,
    "appId": process.env.APP_ID,
    "masterKey": process.env.MASTER_KEY,
    "appName": "TestApp!",
    "iconName": "test.png"
  }
];
const users = [
  {
    "user": "admin",
    "pass": process.env.ADMIN_PSWD,
    "apps": [
      {
        "appId": process.env.APP_ID
      }
    ]
  },
];

var config = {
  "allowInsecureHTTP": true,
  "iconsFolder": "icons",
  "trustProxy": 1,
  "apps": apps,
  "users": users
};

var dashboard = new ParseDashboard(config, { allowInsecureHTTP: config.allowInsecureHTTP });

var app = express();
var mountPath = process.env.MOUNT_PATH || "";
// make the Parse Dashboard available at /dashboard
app.get('/health', (req, res) => {
  res.sendStatus(200)
});

app.use('/' + mountPath, dashboard);

var httpServer = require('http').createServer(app);
var port = process.env.PORT || 4040;
httpServer.listen(port, function () {
  console.log("Dashboard listening on " + port + "!");
});
