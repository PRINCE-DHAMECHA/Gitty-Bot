let getUser = require("./middlewares/authenticate");
var issueController = require("./events/issues");
var commentController = require("./events/comments");
var pull_requestController = require("./events/pull_requests");

module.exports = (app) => {
  // Your code here
  app.log("Yay! The app was loaded!");

  // on opening the issue
  app.on("issues.opened", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    var issueGreetMessage = userObject.issueCreate
    var issueAddLabel = userObject.issueAddLabel
    console.log(issueGreetMessage, " ", issueAddLabel)
    await issueController.issueCreate(context, issueGreetMessage);
    return await issueController.issueAddLabel(context, issueAddLabel)
  });

  app.on("pull_request.opened", async (context) => {
    var userObject = await getUser(context);
    if(userObject == 0){
      return;
    }
    var pull_requestCreateMessage = userObject.pull_requestCreate
    await pull_requestController.pull_requestCreated(context, pull_requestCreateMessage);
    return pull_requestController.pull_requestAddLabel(context, "pending");
    
  });
  

};
