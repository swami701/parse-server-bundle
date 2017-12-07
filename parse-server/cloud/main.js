// cloud code
Parse.Cloud.define("hello", (req, res) => {
  res.success("Hello from parse-cloud");
});