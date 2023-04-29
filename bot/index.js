let authenticate = require("./middlewares/authenticate");
var issueController = require("./events/issues");
var commentController = require("./events/comments");
var pull_requestController = require("./events/pull_requests");

module.exports = (app) => {
  // Your code here
  app.log("Yay! The app was loaded!");

  // on opening the issue
  app.on("issues.opened", async (context) => {
    var userObject = await authenticate(context);
    if (userObject == 0) {
      return;
    }
    var issueGreetMessage = userObject.issueCreate
    var issueAddLabel = userObject.issueAddLabel
    await issueController.issueCreate(context, issueGreetMessage);
    return await issueController.issueAddLabel(context, issueAddLabel)
  });

  

};
