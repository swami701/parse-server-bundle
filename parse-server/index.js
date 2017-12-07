// PM2 configurations
var pmx = require('pmx').init({
  http: true, // HTTP routes logging (default: true)
  ignore_routes: [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors: true, // Exceptions loggin (default: true)
  custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network: true, // Network monitoring at the application level
  ports: true // Shows which ports your app is listening on (default: false)
});

// Example express application adding the parse-server module to expose Parse
// compatible API routes.
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var timeout = require('connect-timeout');

var checkEnv = require('./checkEnv.js');
checkEnv();

var port = process.env.PORT || 1337;
var mountPath = process.env.PARSE_MOUNT || '/parse';

// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey
var parseConfiguration = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/dev',
  databaseOptions: {
    server: {
      poolSize: 100
    },
    replSet: {
      poolSize: 100
    }
  },
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY, //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:' + port + mountPath, // Don't forget to change to https if needed,
  appName: "Test",
// liveQuery: {
//   classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
// }
};

// Setting the production logging level only to Error
if (process.env.LOG_LEVEL) {
  parseConfiguration.logLevel = process.env.LOG_LEVEL;
}

var parseApi = new ParseServer(parseConfiguration);
var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Make sure to star the parse-server repo on GitHub!');
});

// Modify the response.send() to handle the timeout properly
app.use(modifyResponseSend);

function modifyResponseSend(req, res, next) {
  var resSend = res.send;
  res.send = (body) => {
    if (!res.headersSent) {
      resSend.call(res, body);
    }
  }
  next();
}

app.use(mountPath, timeout('60s'), (req, res, next) => {
  req.on("timeout", function(evt) {
    if (req.timedout) {
      if (!res.headersSent) {
        res.status(408).send({
          message: 'Request timedout!'
        });
      }
    }
  });
  parseApi(req, res, next);
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
 app.get('/test', function (req, res) {
 res.sendFile(path.join(__dirname, '/public/test.html'));
 });

var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
// ParseServer.createLiveQueryServer(httpServer);